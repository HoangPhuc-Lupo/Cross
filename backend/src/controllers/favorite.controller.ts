import { RequestHandler } from "express";
import { Favorite, ResponseResult } from "../interfaces";
import { ComicModel, FavoriteModel } from "../models";
import { sendResponse } from "../utils";

const createFavorite: RequestHandler<
  any,
  ResponseResult<Favorite>,
  unknown,
  unknown
> = async (req, res, next) => {
  try {
    const { comicId } = req.params;
    const userId = req.user.id;

    const existingComic = await ComicModel.findByPk(comicId);

    if (!existingComic) {
      return sendResponse(res, {
        code: 404,
        status: "error",
        message: "Không tìm thấy truyện",
      });
    }

    const checkfavorite = await FavoriteModel.findOne({
      where: {
        userId: req.user.id,
        comicId,
      },
    });

    if (checkfavorite) {
      return sendResponse(res, {
        code: 400,
        status: "error",
        message: "Vui lòng thử lại",
      });
    }

    const favorite = await FavoriteModel.sync({ alter: true }).then(() => {
      return FavoriteModel.create({
        comicId,
        userId,
      });
    });

    sendResponse(res, {
      code: 201,
      status: "success",
      data: favorite,
    });
  } catch (error) {
    next(error);
  }
};

const deleteFavorite: RequestHandler<
  any,
  ResponseResult<Favorite>,
  unknown,
  unknown
> = async (req, res, next) => {
  try {
    const { comicId } = req.params;

    const favorite = await FavoriteModel.findOne({
      where: {
        userId: req.user.id,
        comicId,
      },
    });
    if (!favorite) {
      return sendResponse(res, {
        code: 404,
        status: "error",
        message: "Không tìm thấy truyện",
      });
    }
    favorite.destroy();

    return sendResponse(res, {
      code: 200,
      status: "success",
      message: "Xoá yêu thích thành công.",
    });
  } catch (error) {
    next(error);
  }
};

const FavoriteController = {
  createFavorite: createFavorite,
  deleteFavorite: deleteFavorite,
};

export default FavoriteController;
