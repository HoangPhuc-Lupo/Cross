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
const moment_1 = __importDefault(require("moment"));
const sequelize_1 = require("sequelize");
const unidecode_1 = __importDefault(require("unidecode"));
const models_1 = require("../models");
const utils_1 = require("../utils");
const createComic = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, description, poster, status, genre } = req.body;
    try {
        const newComic = yield models_1.ComicModel.sync({
            alter: true,
        }).then(() => {
            return models_1.ComicModel.create({
                title,
                description,
                poster,
                status: status,
                genreId: genre,
            }, {
                include: models_1.GenreModel,
            });
        });
        const result = (yield models_1.ComicModel.findByPk(newComic.id, {
            include: models_1.GenreModel,
            attributes: { exclude: ["genreId"] },
        }));
        return (0, utils_1.sendResponse)(res, {
            code: 201,
            status: "success",
            message: "Thêm truyện thành công",
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
const updateComic = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, description, poster, status, genre } = req.body;
    const { id } = req.params;
    try {
        const existingComic = yield models_1.ComicModel.findByPk(id);
        if (!existingComic) {
            return (0, utils_1.sendResponse)(res, {
                code: 404,
                status: "error",
                message: "Không tìm thấy truyện này",
            });
        }
        // console.log(poster?.length);
        const updateComic = {
            title,
            description,
            poster,
            status,
            genreId: genre,
        };
        title && existingComic.update(Object.assign({}, updateComic));
        const result = (yield models_1.ComicModel.findByPk(existingComic.id, {
            include: models_1.GenreModel,
            attributes: { exclude: ["genreId"] },
        }));
        return (0, utils_1.sendResponse)(res, {
            code: 200,
            status: "success",
            data: result,
            message: "Cập nhật truyện thành công",
        });
    }
    catch (error) {
        next(error);
    }
});
const deleteComic = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const existingComic = yield models_1.ComicModel.findByPk(id);
        if (!existingComic) {
            return (0, utils_1.sendResponse)(res, {
                code: 404,
                status: "error",
                message: "Không tìm thấy truyện này",
            });
        }
        existingComic.destroy();
        return (0, utils_1.sendResponse)(res, {
            code: 200,
            status: "success",
            message: "Xoá truyện thành công",
        });
    }
    catch (error) {
        next(error);
    }
});
const getComic = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { comicId } = req.params;
        const userId = req.user.id;
        const comic = yield models_1.ComicModel.findByPk(comicId, {
            include: models_1.GenreModel,
            attributes: { exclude: ["genreId"] },
        });
        const existingFavorite = yield models_1.FavoriteModel.findOne({
            where: {
                userId: userId,
                comicId: comicId,
            },
        });
        const viewsCount = yield models_1.CountModel.findAll({
            where: {
                comicId,
                userId,
            },
        });
        const newComic = Object.assign(Object.assign({}, comic === null || comic === void 0 ? void 0 : comic.toJSON()), { hasFavorite: !!existingFavorite, viewCounts: viewsCount.length ? viewsCount.length : 0 });
        return (0, utils_1.sendResponse)(res, {
            code: 200,
            status: "success",
            data: newComic,
        });
    }
    catch (error) {
        next(error);
    }
});
const getComicsByGenre = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { genreId } = req.params;
        const comics = yield models_1.ComicModel.findAll({
            where: {
                genreId: genreId,
            },
            include: models_1.GenreModel,
            attributes: { exclude: ["genreId"] },
        });
        return (0, utils_1.sendResponse)(res, {
            code: 200,
            status: "success",
            data: comics,
        });
    }
    catch (error) {
        next(error);
    }
});
const createChapter = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, image } = req.body;
    const { comicId } = req.params;
    try {
        const newImage = typeof image == "object" ? image : [image];
        const newChapter = yield models_1.ChapterModel.sync({
            alter: true,
        }).then(() => {
            return models_1.ChapterModel.create({
                title,
                image: newImage,
                comicId,
            });
        });
        return (0, utils_1.sendResponse)(res, {
            code: 201,
            status: "success",
            message: "Thêm chương thành công",
            data: newChapter,
        });
    }
    catch (error) {
        next(error);
    }
});
const getChapter = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, image } = req.body;
    const { chapterId } = req.params;
    try {
        const existingChapter = yield models_1.ChapterModel.findByPk(chapterId);
        if (!existingChapter) {
            return (0, utils_1.sendResponse)(res, {
                code: 404,
                status: "error",
                message: "Không tìm thấy chương này",
            });
        }
        return (0, utils_1.sendResponse)(res, {
            code: 200,
            status: "success",
            data: existingChapter,
        });
    }
    catch (error) {
        next(error);
    }
});
const updateChapter = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, image } = req.body;
    const { chapterId } = req.params;
    try {
        const existingChapter = yield models_1.ChapterModel.findByPk(chapterId);
        const newImage = typeof image == "object" ? image : [image];
        if (!existingChapter) {
            return (0, utils_1.sendResponse)(res, {
                code: 404,
                status: "error",
                message: "Không tìm thấy chương này",
            });
        }
        const updateChapter = {
            title,
            image: newImage,
        };
        existingChapter.update(Object.assign({}, updateChapter));
        return (0, utils_1.sendResponse)(res, {
            code: 200,
            status: "success",
            data: existingChapter,
            message: "Cập nhật chương thành công",
        });
    }
    catch (error) {
        next(error);
    }
});
const deleteChapter = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { chapterId } = req.params;
    try {
        const existingChapter = yield models_1.ChapterModel.findByPk(chapterId);
        if (!existingChapter) {
            return (0, utils_1.sendResponse)(res, {
                code: 404,
                status: "error",
                message: "Không tìm thấy chương này",
            });
        }
        existingChapter.destroy();
        return (0, utils_1.sendResponse)(res, {
            code: 204,
            status: "success",
            message: "Xoá chương thành công",
        });
    }
    catch (error) {
        next(error);
    }
});
const getChaptersByComic = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { comicId } = req.params;
    try {
        const chapters = yield models_1.ChapterModel.findAll({
            where: {
                comicId,
            },
        });
        return (0, utils_1.sendResponse)(res, {
            code: 200,
            status: "success",
            data: chapters,
        });
    }
    catch (error) {
        next(error);
    }
});
const getComics = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { sort, search } = req.query;
    const checkSort = () => {
        if (sort == "asc")
            return "ASC";
        if (sort == "desc")
            return "DESC";
        return "DESC";
    };
    try {
        if (search) {
            const normalizedSearchQuery = (0, unidecode_1.default)(search);
            const comics = yield models_1.ComicModel.findAll({
                where: {
                    title: {
                        [sequelize_1.Op.like]: `%${normalizedSearchQuery.trim()}%`,
                    },
                },
                include: models_1.GenreModel,
                attributes: { exclude: ["genreId"] },
                order: [["createdAt", checkSort()]],
            });
            return (0, utils_1.sendResponse)(res, {
                code: 200,
                status: "success",
                data: comics,
            });
        }
        const comics = yield models_1.ComicModel.findAll({
            include: models_1.GenreModel,
            attributes: { exclude: ["genreId"] },
            order: [["createdAt", checkSort()]],
        });
        return (0, utils_1.sendResponse)(res, {
            code: 200,
            status: "success",
            data: comics,
        });
    }
    catch (error) {
        next(error);
    }
});
const searchComic = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { query } = req.params;
        const normalizedSearchQuery = (0, unidecode_1.default)(query);
        const comics = yield models_1.ComicModel.findAll({
            where: {
                title: {
                    [sequelize_1.Op.like]: `%${normalizedSearchQuery.trim()}%`,
                },
            },
            include: models_1.GenreModel,
            attributes: { exclude: ["genreId"] },
        });
        return (0, utils_1.sendResponse)(res, {
            code: 200,
            status: "success",
            data: comics,
        });
    }
    catch (error) {
        next(error);
    }
});
const createImageChapter = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, image } = req.body;
    try {
        console.log(req.body);
        return (0, utils_1.sendResponse)(res, {
            code: 200,
            status: "success",
        });
    }
    catch (error) {
        next(error);
    }
});
const getComicsChart = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { filter } = req.query;
        console.log(filter);
        const filterBy = () => {
            switch (filter) {
                case "day":
                    const currentDate = (0, moment_1.default)(new Date()).format("YYYY-MM-DD");
                    return {
                        [sequelize_1.Op.and]: [
                            sequelize_1.Sequelize.where(sequelize_1.Sequelize.fn("DATE", sequelize_1.Sequelize.col(`${utils_1.TABLE_NAME.COUNTS}.createdAt`)), currentDate),
                        ],
                    };
                case "month":
                    const firstDayOfMonth = (0, moment_1.default)()
                        .startOf("month")
                        .format("YYYY-MM-DD");
                    const lastDayOfMonth = (0, moment_1.default)().endOf("month").format("YYYY-MM-DD");
                    return {
                        [sequelize_1.Op.and]: [
                            sequelize_1.Sequelize.where(sequelize_1.Sequelize.col(`${utils_1.TABLE_NAME.COUNTS}.createdAt`), {
                                [sequelize_1.Op.between]: [firstDayOfMonth, lastDayOfMonth],
                            }),
                        ],
                    };
                case "week":
                    const firstDayOfWeek = (0, moment_1.default)().startOf("week").format("YYYY-MM-DD");
                    const lastDayOfWeek = (0, moment_1.default)().endOf("week").format("YYYY-MM-DD");
                    return {
                        [sequelize_1.Op.and]: [
                            sequelize_1.Sequelize.where(sequelize_1.Sequelize.col(`${utils_1.TABLE_NAME.COUNTS}.createdAt`), {
                                [sequelize_1.Op.between]: [firstDayOfWeek, lastDayOfWeek],
                            }),
                        ],
                    };
            }
        };
        const views = yield models_1.CountModel.findAll({
            attributes: [
                [sequelize_1.Sequelize.fn("COUNT", sequelize_1.Sequelize.col("comicId")), "viewCounts"],
                [sequelize_1.Sequelize.col("comic.id"), "id"],
                [sequelize_1.Sequelize.col("comic.poster"), "poster"],
                [sequelize_1.Sequelize.col("comic.title"), "title"],
            ],
            where: filterBy(),
            group: ["comicId"],
            include: [
                {
                    model: models_1.ComicModel,
                    attributes: [],
                },
            ],
            order: [[sequelize_1.Sequelize.literal("viewCounts"), "DESC"]],
        });
        return (0, utils_1.sendResponse)(res, {
            code: 200,
            status: "success",
            data: views,
        });
    }
    catch (error) { }
});
const getComicsByFavorite = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.user.id;
        const favorites = yield models_1.FavoriteModel.findAll({
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
                    model: models_1.ComicModel,
                    attributes: { exclude: ["genreId"] },
                    include: [models_1.GenreModel],
                },
            ],
        });
        return (0, utils_1.sendResponse)(res, {
            code: 200,
            status: "success",
            data: favorites,
        });
    }
    catch (error) {
        next(error);
    }
});
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
exports.default = ComicController;
