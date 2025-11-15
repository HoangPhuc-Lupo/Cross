import { RequestHandler } from "express";
import { Comment, ResponseResult } from "../interfaces";
import { ComicModel, CommentModel, UserModel } from "../models";
import {
  CreateCommentBody,
  CreateCommentParams,
  DeleteCommentParams,
  GetCommentByComicParams,
  UpdateCommentBody,
  UpdateCommentParams,
} from "../schemas";
import { sendResponse } from "../utils";

const createComment: RequestHandler<
  CreateCommentParams,
  ResponseResult<Comment>,
  CreateCommentBody,
  unknown
> = async (req, res, next) => {
  try {
    const { comicId } = req.params;
    const { text } = req.body;
    const userId = req.user.id;

    const existingComic = await ComicModel.findByPk(comicId);
    if (!existingComic) {
      return sendResponse(res, {
        code: 404,
        status: "error",
        message: "Không tìm thấy truyện",
      });
    }

    const newComment = await CommentModel.sync({ alter: true }).then(() => {
      return CommentModel.create({
        text,
        comicId,
        userId,
      });
    });

    sendResponse(res, {
      code: 201,
      status: "success",
      data: newComment,
    });
  } catch (error) {
    next(error);
  }
};

const updateComment: RequestHandler<
  UpdateCommentParams,
  ResponseResult<Comment>,
  UpdateCommentBody,
  unknown
> = async (req, res, next) => {
  try {
    const { commentId } = req.params;
    const { text } = req.body;

    const existingComment = await CommentModel.findByPk(commentId);
    if (!existingComment) {
      return sendResponse(res, {
        code: 404,
        status: "error",
        message: "Không tìm thấy bình luận",
      });
    }
    text &&
      existingComment.update({
        text: text,
      });

    return sendResponse(res, {
      code: 200,
      status: "success",
      message: "Cập nhật bình luận thành công",
    });
  } catch (error) {
    next(error);
  }
};

const deleteComment: RequestHandler<
  DeleteCommentParams,
  ResponseResult<Comment>,
  unknown,
  unknown
> = async (req, res, next) => {
  try {
    const { commentId } = req.params;

    const existingComment = await CommentModel.findByPk(commentId);
    if (!existingComment) {
      return sendResponse(res, {
        code: 404,
        status: "error",
        message: "Không tìm thấy bình luận",
      });
    }
    existingComment.destroy();

    return sendResponse(res, {
      code: 204,
      status: "success",
      message: "Xoá bình luận thành công",
    });
  } catch (error) {
    next(error);
  }
};

const getCommentsByComic: RequestHandler<
  GetCommentByComicParams,
  ResponseResult<Comment[]>,
  unknown,
  unknown
> = async (req, res, next) => {
  try {
    const { comicId } = req.params;

    const existingComic = await ComicModel.findByPk(comicId);
    if (!existingComic) {
      return sendResponse(res, {
        code: 404,
        status: "error",
        message: "Không tìm thấy truyện",
      });
    }

    const comments = await CommentModel.findAll({
      where: {
        comicId,
      },
      include: [
        {
          model: UserModel,
          attributes: { exclude: ["password", "isAdmin"] },
        },
      ],
    });

    return sendResponse(res, {
      code: 200,
      status: "success",
      data: comments,
    });
  } catch (error) {
    next(error);
  }
};

const getComments: RequestHandler<unknown, any, unknown, any> = async (
  req,
  res,
  next
) => {
  try {
    const comments = await CommentModel.findAll({
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
      data: comments,
    });
  } catch (error) {}
};

const CommentController = {
  createComment,
  updateComment,
  deleteComment,
  getCommentsByComic,
  getComments,
};

export default CommentController;
