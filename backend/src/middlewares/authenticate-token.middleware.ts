import { RequestHandler } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET_KEY } from "../utils";

const authenticateToken: RequestHandler<any> = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const accessToken = authHeader && authHeader.split(" ")[1];

  if (!accessToken) {
    return res.status(200).json({
      code: 401,
      status: "error",
      message: "Token không hợp lệ",
    });
  }

  jwt.verify(accessToken, JWT_SECRET_KEY, (err, user: any) => {
    if (err) {
      return res.status(200).json({
        code: 401,
        status: "error",
        message: "Token không hợp lệ",
      });
    }

    req.user = user;
    next();
  });
};

export default authenticateToken;
