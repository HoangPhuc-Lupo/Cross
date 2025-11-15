import { NextFunction, Request, Response } from "express";
import { UserModel } from "../models";
import { sendResponse } from "../utils";

type Role = "admin" | "user";
const checkRole = (roles: Role[]) => {
  return async (req: Request<any>, res: Response, next: NextFunction) => {
    // Get the user ID from previous midleware

    const userId = req.user.id;

    const existingUser = await UserModel.findOne({
      where: { id: userId },
    });

    if (!existingUser) {
      return sendResponse(res, {
        code: 401,
        status: "error",
        message: "Tài nguyên bị từ chối",
      });
    }

    const userRole: Role = existingUser.isAdmin ? "admin" : "user";

    if (roles.indexOf(userRole) > -1) next();
    else
      return sendResponse(res, {
        code: 401,
        status: "error",
        message: "Tài nguyên bị từ chối",
      });
  };
};

export default checkRole;
