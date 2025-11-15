import { RequestHandler } from "express";
import { Rating, ResponseResult } from "../interfaces";
import { ComicModel, RatingModel, UserModel } from "../models";
import {
  DeleteRatingParams,
  GetUserRatingByComicParams,
  RatingBody,
  RatingParams,
} from "../schemas";
import { sendResponse } from "../utils";

const rating: RequestHandler<
  RatingParams,
  ResponseResult<Rating>,
  RatingBody,
  unknown
> = async (req, res, next) => {
  try {
    const { comicId } = req.params;
    const { rating } = req.body;
    const userId = req.user.id;

    const existingComic = await ComicModel.findByPk(comicId);
    if (!existingComic) {
      return sendResponse(res, {
        code: 404,
        status: "error",
        message: "Không tìm thấy truyện",
      });
    }

    const existingRating = await RatingModel.findOne({
      where: {
        userId,
        comicId,
      },
    });
    if (existingRating) {
      existingRating.update({
        rating,
      });

      return sendResponse(res, {
        code: 200,
        status: "success",
        message: "Cập nhật đánh giá thành công",
        data: existingRating,
      });
    }

    const newRating = await RatingModel.sync({ alter: true }).then(() => {
      return RatingModel.create({
        rating,
        comicId,
        userId,
      });
    });

    sendResponse(res, {
      code: 201,
      status: "success",
      message: "Đánh giá thành công",
      data: newRating,
    });
  } catch (error) {
    next(error);
  }
};

const deleteRating: RequestHandler<
  DeleteRatingParams,
  ResponseResult<null>,
  unknown,
  unknown
> = async (req, res, next) => {
  try {
    const { ratingId } = req.params;

    const existingRating = await RatingModel.findByPk(ratingId);
    if (!existingRating) {
      return sendResponse(res, {
        code: 404,
        status: "error",
        message: "Không tìm thấy đánh giá",
      });
    }
    existingRating.destroy();

    return sendResponse(res, {
      code: 204,
      status: "success",
      message: "Xoá đánh giá thành công",
    });
  } catch (error) {
    next(error);
  }
};

const getUserRatingByMovie: RequestHandler<
  GetUserRatingByComicParams,
  ResponseResult<Rating | null>,
  unknown,
  unknown
> = async (req, res, next) => {
  try {
    const { comicId } = req.params;

    const movie = await ComicModel.findByPk(comicId);
    if (!movie) {
      return sendResponse(res, {
        code: 404,
        status: "error",
        message: "Không tìm thấy truyện",
      });
    }

    const existingRating = await RatingModel.findOne({
      where: {
        comicId,
        userId: req.user.id,
      },
    });

    if (!existingRating) {
      return sendResponse(res, {
        code: 404,
        status: "error",
        message: "Bạn chưa đánh giá truyện",
      });
    }

    return sendResponse(res, {
      code: 200,
      status: "success",
      data: existingRating as any,
    });
  } catch (error) {
    next(error);
  }
};

const getRatings: RequestHandler<unknown, any, unknown, any> = async (
  req,
  res,
  next
) => {
  try {
    const ratings = await RatingModel.findAll({
      include: [
        { model: UserModel, attributes: { exclude: ["password"] } },
        {
          model: ComicModel,
        },
      ],
    });

    return sendResponse(res, {
      code: 200,
      status: "success",
      data: ratings,
    });
  } catch (error) {}
};

const RatingController = {
  rating,
  deleteRating,
  getUserRatingByMovie,
  getRatings,
};

export default RatingController;
