import { RequestHandler } from "express";
import { Genre, ResponseResult } from "../interfaces";
import { GenreModel } from "../models";
import {
  CreateGenreBody,
  DeleteGenreParams,
  UpdateGenreBody,
  UpdateGenreParams,
} from "../schemas";
import { sendResponse } from "../utils";

const createGenre: RequestHandler<
  unknown,
  ResponseResult<Genre>,
  CreateGenreBody,
  unknown
> = async (req, res, next) => {
  const { title } = req.body;
  try {
    const newGenre = await GenreModel.sync({
      alter: true,
    }).then(() => {
      return GenreModel.create({
        title,
      });
    });

    return sendResponse(res, {
      code: 201,
      status: "success",
      message: "Thêm thể loại thành công",
      data: newGenre,
    });
  } catch (error) {
    next(error);
  }
};

const updateGenre: RequestHandler<
  UpdateGenreParams,
  ResponseResult<Genre>,
  UpdateGenreBody,
  unknown
> = async (req, res, next) => {
  const { title } = req.body;
  const { genreId } = req.params;

  try {
    const existingGenre = await GenreModel.findByPk(genreId);

    if (!existingGenre) {
      return sendResponse(res, {
        code: 404,
        status: "error",
        message: "Không tìm thấy thể loại này",
      });
    }

    title && existingGenre.update({ title });
    return sendResponse(res, {
      code: 200,
      status: "success",
      data: existingGenre,
    });
  } catch (error) {
    next(error);
  }
};

const deleteGenre: RequestHandler<
  DeleteGenreParams,
  ResponseResult<null>,
  unknown,
  unknown
> = async (req, res, next) => {
  const { genreId } = req.params;
  try {
    const existingGenre = await GenreModel.findByPk(genreId);

    if (!existingGenre) {
      return sendResponse(res, {
        code: 404,
        status: "error",
        message: "Không tìm thấy thể loại này",
      });
    }

    existingGenre.destroy();

    return sendResponse(res, {
      code: 200,
      status: "success",
      message: "Xoá thể loại thành công",
    });
  } catch (error) {
    next(error);
  }
};

const getGenres: RequestHandler<
  unknown,
  ResponseResult<Genre[]>,
  unknown,
  unknown
> = async (req, res, next) => {
  try {
    const genres = await GenreModel.findAll();
    return sendResponse(res, {
      code: 200,
      status: "success",
      data: genres,
    });
  } catch (error) {
    next(error);
  }
};

const GenreController = {
  createGenre,
  updateGenre,
  deleteGenre,
  getGenres,
};

export default GenreController;
