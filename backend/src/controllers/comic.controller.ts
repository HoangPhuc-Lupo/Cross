import { RequestHandler } from "express";
import moment from "moment";
import { Op, Sequelize } from "sequelize";
import unidecode from "unidecode";
import { Chapter, Comic, ResponseResult } from "../interfaces";
import {
  ChapterModel,
  ComicModel,
  CountModel,
  FavoriteModel,
  GenreModel,
} from "../models";
import {
  CreateChapterBody,
  CreateChapterParams,
  CreateComicBody,
  DeleteChapterParams,
  DeleteComicParams,
  GetChaptersByComicParams,
  GetComicsChartQuery,
  GetComicsQuery,
  SearchComicParams,
  UpdateChapterBody,
  UpdateChapterParams,
  UpdateComicBody,
  UpdateComicParams,
} from "../schemas";
import { TABLE_NAME, sendResponse } from "../utils";

const createComic: RequestHandler<
  unknown,
  ResponseResult<Comic>,
  CreateComicBody,
  unknown
> = async (req, res, next) => {
  const { title, description, poster, status, genre } = req.body;
  try {
    const newComic = await ComicModel.sync({
      alter: true,
    }).then(() => {
      return ComicModel.create(
        {
          title,
          description,
          poster,
          status: status as any,
          genreId: genre,
        },
        {
          include: GenreModel,
        }
      );
    });

    const result = (await ComicModel.findByPk(newComic.id, {
      include: GenreModel,
      attributes: { exclude: ["genreId"] },
    })) as Comic;

    return sendResponse(res, {
      code: 201,
      status: "success",
      message: "Thêm truyện thành công",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const updateComic: RequestHandler<
  UpdateComicParams,
  ResponseResult<Comic>,
  UpdateComicBody,
  unknown
> = async (req, res, next) => {
  const { title, description, poster, status, genre } = req.body;
  const { id } = req.params;
  try {
    const existingComic = await ComicModel.findByPk(id);

    if (!existingComic) {
      return sendResponse(res, {
        code: 404,
        status: "error",
        message: "Không tìm thấy truyện này",
      });
    }

    // console.log(poster?.length);

    const updateComic: any = {
      title,
      description,
      poster,
      status,
      genreId: genre,
    };

    title && existingComic.update({ ...updateComic });

    const result = (await ComicModel.findByPk(existingComic.id, {
      include: GenreModel,
      attributes: { exclude: ["genreId"] },
    })) as Comic;

    return sendResponse(res, {
      code: 200,
      status: "success",
      data: result,
      message: "Cập nhật truyện thành công",
    });
  } catch (error) {
    next(error);
  }
};

const deleteComic: RequestHandler<
  DeleteComicParams,
  ResponseResult<null>,
  unknown,
  unknown
> = async (req, res, next) => {
  const { id } = req.params;
  try {
    const existingComic = await ComicModel.findByPk(id);

    if (!existingComic) {
      return sendResponse(res, {
        code: 404,
        status: "error",
        message: "Không tìm thấy truyện này",
      });
    }

    existingComic.destroy();

    return sendResponse(res, {
      code: 200,
      status: "success",
      message: "Xoá truyện thành công",
    });
  } catch (error) {
    next(error);
  }
};

const getComic: RequestHandler<
  any,
  ResponseResult<Comic | null>,
  unknown,
  unknown
> = async (req, res, next) => {
  try {
    const { comicId } = req.params;
    const userId = req.user.id;

    const comic = await ComicModel.findByPk(comicId, {
      include: GenreModel,
      attributes: { exclude: ["genreId"] },
    });

    const existingFavorite = await FavoriteModel.findOne({
      where: {
        userId: userId,
        comicId: comicId,
      },
    });

    const viewsCount = await CountModel.findAll({
      where: {
        comicId,
        userId,
      },
    });

    const newComic: Comic = {
      ...(comic?.toJSON() as any),
      hasFavorite: !!existingFavorite,
      viewCounts: viewsCount.length ? viewsCount.length : 0,
    };

    return sendResponse(res, {
      code: 200,
      status: "success",
      data: newComic,
    });
  } catch (error) {
    next(error);
  }
};

const getComicsByGenre: RequestHandler<
  any,
  ResponseResult<Comic[]>,
  unknown,
  unknown
> = async (req, res, next) => {
  try {
    const { genreId } = req.params;

    const comics = await ComicModel.findAll({
      where: {
        genreId: genreId,
      },
      include: GenreModel,
      attributes: { exclude: ["genreId"] },
    });
    return sendResponse(res, {
      code: 200,
      status: "success",
      data: comics,
    });
  } catch (error) {
    next(error);
  }
};

const createChapter: RequestHandler<
  CreateChapterParams,
  ResponseResult<Chapter>,
  CreateChapterBody,
  unknown
> = async (req, res, next) => {
  const { title, image } = req.body;
  const { comicId } = req.params;
  try {
    const newImage = typeof image == "object" ? image : ([image] as any);

    const newChapter = await ChapterModel.sync({
      alter: true,
    }).then(() => {
      return ChapterModel.create({
        title,
        image: newImage,
        comicId,
      });
    });

    return sendResponse(res, {
      code: 201,
      status: "success",
      message: "Thêm chương thành công",
      data: newChapter,
    });
  } catch (error) {
    next(error);
  }
};

const getChapter: RequestHandler<
  any,
  ResponseResult<Chapter>,
  any,
  unknown
> = async (req, res, next) => {
  const { title, image } = req.body;
  const { chapterId } = req.params;

  try {
    const existingChapter = await ChapterModel.findByPk(chapterId);

    if (!existingChapter) {
      return sendResponse(res, {
        code: 404,
        status: "error",
        message: "Không tìm thấy chương này",
      });
    }

    return sendResponse(res, {
      code: 200,
      status: "success",
      data: existingChapter,
    });
  } catch (error) {
    next(error);
  }
};

const updateChapter: RequestHandler<
  UpdateChapterParams,
  ResponseResult<Chapter>,
  UpdateChapterBody,
  unknown
> = async (req, res, next) => {
  const { title, image } = req.body;
  const { chapterId } = req.params;

  try {
    const existingChapter = await ChapterModel.findByPk(chapterId);

    const newImage = typeof image == "object" ? image : [image];

    if (!existingChapter) {
      return sendResponse(res, {
        code: 404,
        status: "error",
        message: "Không tìm thấy chương này",
      });
    }

    const updateChapter: any = {
      title,
      image: newImage,
    };

    existingChapter.update({ ...updateChapter });

    return sendResponse(res, {
      code: 200,
      status: "success",
      data: existingChapter,
      message: "Cập nhật chương thành công",
    });
  } catch (error) {
    next(error);
  }
};

const deleteChapter: RequestHandler<
  DeleteChapterParams,
  ResponseResult<null>,
  unknown,
  unknown
> = async (req, res, next) => {
  const { chapterId } = req.params;
  try {
    const existingChapter = await ChapterModel.findByPk(chapterId);

    if (!existingChapter) {
      return sendResponse(res, {
        code: 404,
        status: "error",
        message: "Không tìm thấy chương này",
      });
    }

    existingChapter.destroy();

    return sendResponse(res, {
      code: 204,
      status: "success",
      message: "Xoá chương thành công",
    });
  } catch (error) {
    next(error);
  }
};

const getChaptersByComic: RequestHandler<
  GetChaptersByComicParams,
  ResponseResult<Chapter[]>,
  unknown,
  unknown
> = async (req, res, next) => {
  const { comicId } = req.params;
  try {
    const chapters = await ChapterModel.findAll({
      where: {
        comicId,
      },
    });

    return sendResponse(res, {
      code: 200,
      status: "success",
      data: chapters,
    });
  } catch (error) {
    next(error);
  }
};

const getComics: RequestHandler<
  unknown,
  ResponseResult<Comic[]>,
  unknown,
  GetComicsQuery
> = async (req, res, next) => {
  const { sort, search } = req.query;

  const checkSort = () => {
    if (sort == "asc") return "ASC";
    if (sort == "desc") return "DESC";
    return "DESC";
  };
  try {
    if (search) {
      const normalizedSearchQuery = unidecode(search);
      const comics = await ComicModel.findAll({
        where: {
          title: {
            [Op.like]: `%${normalizedSearchQuery.trim()}%`,
          },
        },
        include: GenreModel,
        attributes: { exclude: ["genreId"] },
        order: [["createdAt", checkSort()]],
      });

      return sendResponse(res, {
        code: 200,
        status: "success",
        data: comics,
      });
    }
    const comics = await ComicModel.findAll({
      include: GenreModel,
      attributes: { exclude: ["genreId"] },
      order: [["createdAt", checkSort()]],
    });
    return sendResponse(res, {
      code: 200,
      status: "success",
      data: comics,
    });
  } catch (error) {
    next(error);
  }
};

const searchComic: RequestHandler<
  SearchComicParams,
  ResponseResult<Comic[]>,
  unknown,
  unknown
> = async (req, res, next) => {
  try {
    const { query } = req.params;

    const normalizedSearchQuery = unidecode(query);

    const comics = await ComicModel.findAll({
      where: {
        title: {
          [Op.like]: `%${normalizedSearchQuery.trim()}%`,
        },
      },
      include: GenreModel,
      attributes: { exclude: ["genreId"] },
    });

    return sendResponse(res, {
      code: 200,
      status: "success",
      data: comics,
    });
  } catch (error) {
    next(error);
  }
};

const createImageChapter: RequestHandler<
  unknown,
  ResponseResult<Chapter>,
  CreateChapterBody,
  unknown
> = async (req, res, next) => {
  const { title, image } = req.body;

  try {
    console.log(req.body);
    return sendResponse(res, {
      code: 200,
      status: "success",
    });
  } catch (error) {
    next(error);
  }
};

const getComicsChart: RequestHandler<
  any,
  any,
  any,
  GetComicsChartQuery
> = async (req, res, next) => {
  try {
    const { filter } = req.query;
    console.log(filter);

    const filterBy = () => {
      switch (filter) {
        case "day":
          const currentDate = moment(new Date()).format("YYYY-MM-DD");
          return {
            [Op.and]: [
              Sequelize.where(
                Sequelize.fn(
                  "DATE",
                  Sequelize.col(`${TABLE_NAME.COUNTS}.createdAt`)
                ),
                currentDate
              ),
            ],
          };

        case "month":
          const firstDayOfMonth = moment()
            .startOf("month")
            .format("YYYY-MM-DD");
          const lastDayOfMonth = moment().endOf("month").format("YYYY-MM-DD");
          return {
            [Op.and]: [
              Sequelize.where(Sequelize.col(`${TABLE_NAME.COUNTS}.createdAt`), {
                [Op.between]: [firstDayOfMonth, lastDayOfMonth],
              }),
            ],
          };

        case "week":
          const firstDayOfWeek = moment().startOf("week").format("YYYY-MM-DD");
          const lastDayOfWeek = moment().endOf("week").format("YYYY-MM-DD");
          return {
            [Op.and]: [
              Sequelize.where(Sequelize.col(`${TABLE_NAME.COUNTS}.createdAt`), {
                [Op.between]: [firstDayOfWeek, lastDayOfWeek],
              }),
            ],
          };
      }
    };

    const views = await CountModel.findAll({
      attributes: [
        [Sequelize.fn("COUNT", Sequelize.col("comicId")), "viewCounts"],
        [Sequelize.col("comic.id"), "id"],
        [Sequelize.col("comic.poster"), "poster"],
        [Sequelize.col("comic.title"), "title"],
      ],
      where: filterBy(),
      group: ["comicId"],
      include: [
        {
          model: ComicModel,
          attributes: [],
        },
      ],
      order: [[Sequelize.literal("viewCounts"), "DESC"]],
    });

    return sendResponse(res, {
      code: 200,
      status: "success",
      data: views,
    });
  } catch (error) {}
};

const getComicsByFavorite: RequestHandler<any, any, unknown, unknown> = async (
  req,
  res,
  next
) => {
  try {
    const userId = req.user.id;

    const favorites = await FavoriteModel.findAll({
      where: {
        userId: userId,
      },
      // attributes: [
      //   [Sequelize.col("comic.id"), "id"],
      //   [Sequelize.col("comic.poster"), "poster"],
      //   [Sequelize.col("comic.title"), "title"],
      //   [Sequelize.col("comic.description"), "description"],
      // ],
      include: [
        {
          model: ComicModel,
          attributes: { exclude: ["genreId"] },
          include: [GenreModel],
        },
      ],
    });

    return sendResponse(res, {
      code: 200,
      status: "success",
      data: favorites,
    });
  } catch (error) {
    next(error);
  }
};

const ComicController = {
  createComic,
  updateComic,
  deleteComic,
  getComic,
  getComics,
  createChapter,
  updateChapter,
  getChapter,
  deleteChapter,
  getChaptersByComic,
  searchComic,
  createImageChapter,
  getComicsByGenre,
  getComicsChart,
  getComicsByFavorite,
};

export default ComicController;
