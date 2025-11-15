import { RequestHandler } from "express";
import { CountModel } from "../models";
import { sendResponse } from "../utils";
import { ResponseResult } from "../interfaces";

const getCount: RequestHandler<
  any,
  ResponseResult<any>,
  unknown,
  unknown
> = async (req, res, next) => {
  try {
    const { comicId } = req.params;
    const userId = req.user.id;
    const views = await CountModel.findAll({
      where: {
        userId,
        comicId,
      },
    });

    return sendResponse(res, {
      code: 200,
      status: "success",
      data: views.length ? views.length : 0,
    });
  } catch (error) {
    next(error);
  }
};

const createCount: RequestHandler<
  any,
  ResponseResult<any>,
  unknown,
  unknown
> = async (req, res, next) => {
  try {
    const { comicId } = req.params;
    const userId = req.user.id;

    const view = await CountModel.sync({ alter: true }).then(() => {
      return CountModel.create({
        comicId,
        userId,
      });
    });

    return sendResponse(res, {
      code: 200,
      status: "success",
      data: view,
    });
  } catch (error) {
    next(error);
  }
};

const CountController = {
  getCount,
  createCount,
};

export default CountController;
