import bcrypt from "bcryptjs";
import { RequestHandler } from "express";
import _ from "lodash";
import { ResponseResult, User } from "../interfaces";
import { generateToken } from "../middlewares";
import { UserModel } from "../models";
import { LoginBody, SignUpBody, UpdateUserBody } from "../schemas";
import { sendResponse } from "../utils";
import { createTransport } from "nodemailer";
/** signup */
const signUp: RequestHandler<
  unknown,
  ResponseResult<null>,
  SignUpBody,
  unknown
> = async (req, res, next) => {
  const { username, password, fullname, email } = req.body;

  try {
    const existingUser = await UserModel.findOne({
      where: { username },
    });

    if (existingUser) {
      return sendResponse(res, {
        code: 409,
        status: "error",
        message: "Tên người dùng đã được sử dụng",
      });
    }

    const existingEmail = await UserModel.findOne({
      where: { email },
    });

    if (existingEmail) {
      return sendResponse(res, {
        code: 409,
        status: "error",
        message: "Email đã được sử dụng",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await UserModel.sync({ alter: true }).then(() => {
      return UserModel.create({
        username,
        fullname,
        password: hashedPassword,
        photoURL:
          "https://static2.yan.vn/YanNews/2167221/202102/facebook-cap-nhat-avatar-doi-voi-tai-khoan-khong-su-dung-anh-dai-dien-e4abd14d.jpg",
        email,
      });
    });

    return sendResponse(res, {
      code: 201,
      status: "success",
      message: "Tạo tài khoản thành công",
    });
  } catch (error) {
    next(error);
  }
};

/** login */
const login: RequestHandler<
  unknown,
  ResponseResult<User>,
  LoginBody,
  unknown
> = async (req, res, next) => {
  const { username, password } = req.body;

  try {
    const existingUser = await UserModel.findOne({
      where: { username },
    });

    if (!existingUser) {
      return sendResponse(res, {
        code: 404,
        status: "error",
        message: "Không tìm thấy người dùng",
      });
    }

    const isPasswordMatch = await bcrypt.compare(
      password,
      existingUser.password as string
    );

    if (!isPasswordMatch) {
      return sendResponse(res, {
        code: 400,
        status: "error",
        message: "Tên người dùng hoặc mật khẩu không đúng, vui lòng thử lại",
      });
    }

    const userObj = _.omit(existingUser.toJSON() as User, ["password"]);

    const accessToken = generateToken(existingUser);

    return sendResponse(res, {
      code: 200,
      status: "success",
      message: "Đăng nhập thành công",
      data: userObj,
      accessToken: accessToken,
    });
  } catch (error) {
    next(error);
  }
};

/** get user */
const getUser: RequestHandler<
  unknown,
  ResponseResult<User | undefined>,
  unknown,
  unknown
> = async (req, res, next) => {
  const userId = req.user?.id;

  try {
    const existingUser = await UserModel.findByPk(userId, {
      attributes: { exclude: ["password"] },
    });

    if (!existingUser) {
      return sendResponse(res, {
        code: 404,
        status: "error",
        message: "Không tìm thấy người dùng",
      });
    }

    return sendResponse(res, {
      code: 200,
      status: "success",
      data: existingUser,
    });
  } catch (error) {
    next(error);
  }
};

/** update user */
const updateUser: RequestHandler<
  unknown,
  ResponseResult<User>,
  UpdateUserBody,
  unknown
> = async (req, res, next) => {
  const { fullname, username, photoURL } = req.body;
  const userId = req.user?.id;
  try {
    if (!userId) {
      return sendResponse(res, {
        code: 404,
        status: "error",
        message: "Vui lòng kiểm tra lại",
      });
    }

    const user = await UserModel.findByPk(userId);

    if (!user) {
      return sendResponse(res, {
        code: 404,
        status: "error",
        message: "Không tìm thấy người dùng",
      });
    }

    user.update({
      fullname,
      username,
      photoURL,
    });

    return sendResponse(res, {
      code: 200,
      status: "success",
      message: "Cập nhật thông tin thành công",
    });
  } catch (error) {
    next(error);
  }
};

const forgotPassword: RequestHandler<
  any,
  ResponseResult<any>,
  any,
  unknown
> = async (req, res, next) => {
  const { email } = req.body;

  try {
    const existingUser = await UserModel.findOne({
      where: { email },
    });

    if (!existingUser) {
      return sendResponse(res, {
        code: 409,
        status: "error",
        message: "Email chưa được sử dụng",
      });
    }

    const randomPassword = Math.random().toString(36).slice(-8);
    const hashedPassword = await bcrypt.hash(randomPassword, 10);

    const yourEmail = "youremail@gmail.com";

    try {
      const transporter = createTransport({
        service: "Gmail",
        auth: {
          user: yourEmail, // Replace with your email address
          pass: "yourpass", // Replace with your email password
        },
      });

      await transporter.sendMail({
        from: yourEmail,
        to: email,
        subject: "Mật khẩu mới của bạn",
        text: `Mật khẩu mới của bạn là: ${randomPassword}`,
      });

      existingUser.update({
        password: hashedPassword,
      });

      return sendResponse(res, {
        code: 200,
        status: "success",
        message: "Đã gửi mật khẩu tới địa chỉ email của bạn",
      });
    } catch (error) {
      console.log(error);
    }
  } catch (error) {
    next(error);
  }
};

const changePassword: RequestHandler<
  any,
  ResponseResult<any>,
  any,
  unknown
> = async (req, res, next) => {
  const userId = req.user.id;

  const { currentPassword, newPassword } = req.body;

  try {
    const existingUser = await UserModel.findByPk(userId);

    if (!existingUser) {
      return sendResponse(res, {
        code: 404,
        status: "error",
        message: "Không tìm thấy người dùng",
      });
    }

    const isPasswordMatch = await bcrypt.compare(
      currentPassword,
      existingUser.password as string
    );

    if (!isPasswordMatch) {
      return sendResponse(res, {
        code: 400,
        status: "error",
        message: "Mật khẩu cũ không hợp lệ",
      });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    existingUser.update({
      password: hashedPassword,
    });

    return sendResponse(res, {
      code: 200,
      status: "success",
      message: "Đổi mật khẩu thành công",
    });
  } catch (error) {
    next(error);
  }
};

const UserController = {
  signUp,
  login,
  getUser,
  updateUser,
  forgotPassword,
  changePassword,
};

export default UserController;
