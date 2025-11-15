"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const lodash_1 = __importDefault(require("lodash"));
const middlewares_1 = require("../middlewares");
const models_1 = require("../models");
const utils_1 = require("../utils");
const nodemailer_1 = require("nodemailer");
/** signup */
const signUp = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password, fullname, email } = req.body;
    try {
        const existingUser = yield models_1.UserModel.findOne({
            where: { username },
        });
        if (existingUser) {
            return (0, utils_1.sendResponse)(res, {
                code: 409,
                status: "error",
                message: "Tên người dùng đã được sử dụng",
            });
        }
        const existingEmail = yield models_1.UserModel.findOne({
            where: { email },
        });
        if (existingEmail) {
            return (0, utils_1.sendResponse)(res, {
                code: 409,
                status: "error",
                message: "Email đã được sử dụng",
            });
        }
        const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
        const newUser = yield models_1.UserModel.sync({ alter: true }).then(() => {
            return models_1.UserModel.create({
                username,
                fullname,
                password: hashedPassword,
                photoURL: "https://static2.yan.vn/YanNews/2167221/202102/facebook-cap-nhat-avatar-doi-voi-tai-khoan-khong-su-dung-anh-dai-dien-e4abd14d.jpg",
                email,
            });
        });
        return (0, utils_1.sendResponse)(res, {
            code: 201,
            status: "success",
            message: "Tạo tài khoản thành công",
        });
    }
    catch (error) {
        next(error);
    }
});
/** login */
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    try {
        const existingUser = yield models_1.UserModel.findOne({
            where: { username },
        });
        if (!existingUser) {
            return (0, utils_1.sendResponse)(res, {
                code: 404,
                status: "error",
                message: "Không tìm thấy người dùng",
            });
        }
        const isPasswordMatch = yield bcryptjs_1.default.compare(password, existingUser.password);
        if (!isPasswordMatch) {
            return (0, utils_1.sendResponse)(res, {
                code: 400,
                status: "error",
                message: "Tên người dùng hoặc mật khẩu không đúng, vui lòng thử lại",
            });
        }
        const userObj = lodash_1.default.omit(existingUser.toJSON(), ["password"]);
        const accessToken = (0, middlewares_1.generateToken)(existingUser);
        return (0, utils_1.sendResponse)(res, {
            code: 200,
            status: "success",
            message: "Đăng nhập thành công",
            data: userObj,
            accessToken: accessToken,
        });
    }
    catch (error) {
        next(error);
    }
});
/** get user */
const getUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
    try {
        const existingUser = yield models_1.UserModel.findByPk(userId, {
            attributes: { exclude: ["password"] },
        });
        if (!existingUser) {
            return (0, utils_1.sendResponse)(res, {
                code: 404,
                status: "error",
                message: "Không tìm thấy người dùng",
            });
        }
        return (0, utils_1.sendResponse)(res, {
            code: 200,
            status: "success",
            data: existingUser,
        });
    }
    catch (error) {
        next(error);
    }
});
/** update user */
const updateUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const { fullname, username, photoURL } = req.body;
    const userId = (_b = req.user) === null || _b === void 0 ? void 0 : _b.id;
    try {
        if (!userId) {
            return (0, utils_1.sendResponse)(res, {
                code: 404,
                status: "error",
                message: "Vui lòng kiểm tra lại",
            });
        }
        const user = yield models_1.UserModel.findByPk(userId);
        if (!user) {
            return (0, utils_1.sendResponse)(res, {
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
        return (0, utils_1.sendResponse)(res, {
            code: 200,
            status: "success",
            message: "Cập nhật thông tin thành công",
        });
    }
    catch (error) {
        next(error);
    }
});
const forgotPassword = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    try {
        const existingUser = yield models_1.UserModel.findOne({
            where: { email },
        });
        if (!existingUser) {
            return (0, utils_1.sendResponse)(res, {
                code: 409,
                status: "error",
                message: "Email chưa được sử dụng",
            });
        }
        const randomPassword = Math.random().toString(36).slice(-8);
        const hashedPassword = yield bcryptjs_1.default.hash(randomPassword, 10);
        const yourEmail = "youremail@gmail.com";
        try {
            const transporter = (0, nodemailer_1.createTransport)({
                service: "Gmail",
                auth: {
                    user: yourEmail,
                    pass: "yourpass", // Replace with your email password
                },
            });
            yield transporter.sendMail({
                from: yourEmail,
                to: email,
                subject: "Mật khẩu mới của bạn",
                text: `Mật khẩu mới của bạn là: ${randomPassword}`,
            });
            existingUser.update({
                password: hashedPassword,
            });
            return (0, utils_1.sendResponse)(res, {
                code: 200,
                status: "success",
                message: "Đã gửi mật khẩu tới địa chỉ email của bạn",
            });
        }
        catch (error) {
            console.log(error);
        }
    }
    catch (error) {
        next(error);
    }
});
const changePassword = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.user.id;
    const { currentPassword, newPassword } = req.body;
    try {
        const existingUser = yield models_1.UserModel.findByPk(userId);
        if (!existingUser) {
            return (0, utils_1.sendResponse)(res, {
                code: 404,
                status: "error",
                message: "Không tìm thấy người dùng",
            });
        }
        const isPasswordMatch = yield bcryptjs_1.default.compare(currentPassword, existingUser.password);
        if (!isPasswordMatch) {
            return (0, utils_1.sendResponse)(res, {
                code: 400,
                status: "error",
                message: "Mật khẩu cũ không hợp lệ",
            });
        }
        const hashedPassword = yield bcryptjs_1.default.hash(newPassword, 10);
        existingUser.update({
            password: hashedPassword,
        });
        return (0, utils_1.sendResponse)(res, {
            code: 200,
            status: "success",
            message: "Đổi mật khẩu thành công",
        });
    }
    catch (error) {
        next(error);
    }
});
const UserController = {
    signUp,
    login,
    getUser,
    updateUser,
    forgotPassword,
    changePassword,
};
exports.default = UserController;
