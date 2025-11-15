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
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("../models");
const utils_1 = require("../utils");
const rating = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { comicId } = req.params;
        const { rating } = req.body;
        const userId = req.user.id;
        const existingComic = yield models_1.ComicModel.findByPk(comicId);
        if (!existingComic) {
            return (0, utils_1.sendResponse)(res, {
                code: 404,
                status: "error",
                message: "Không tìm thấy truyện",
            });
        }
        const existingRating = yield models_1.RatingModel.findOne({
            where: {
                userId,
                comicId,
            },
        });
        if (existingRating) {
            existingRating.update({
                rating,
            });
            return (0, utils_1.sendResponse)(res, {
                code: 200,
                status: "success",
                message: "Cập nhật đánh giá thành công",
                data: existingRating,
            });
        }
        const newRating = yield models_1.RatingModel.sync({ alter: true }).then(() => {
            return models_1.RatingModel.create({
                rating,
                comicId,
                userId,
            });
        });
        (0, utils_1.sendResponse)(res, {
            code: 201,
            status: "success",
            message: "Đánh giá thành công",
            data: newRating,
        });
    }
    catch (error) {
        next(error);
    }
});
const deleteRating = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { ratingId } = req.params;
        const existingRating = yield models_1.RatingModel.findByPk(ratingId);
        if (!existingRating) {
            return (0, utils_1.sendResponse)(res, {
                code: 404,
                status: "error",
                message: "Không tìm thấy đánh giá",
            });
        }
        existingRating.destroy();
        return (0, utils_1.sendResponse)(res, {
            code: 204,
            status: "success",
            message: "Xoá đánh giá thành công",
        });
    }
    catch (error) {
        next(error);
    }
});
const getUserRatingByMovie = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { comicId } = req.params;
        const movie = yield models_1.ComicModel.findByPk(comicId);
        if (!movie) {
            return (0, utils_1.sendResponse)(res, {
                code: 404,
                status: "error",
                message: "Không tìm thấy truyện",
            });
        }
        const existingRating = yield models_1.RatingModel.findOne({
            where: {
                comicId,
                userId: req.user.id,
            },
        });
        if (!existingRating) {
            return (0, utils_1.sendResponse)(res, {
                code: 404,
                status: "error",
                message: "Bạn chưa đánh giá truyện",
            });
        }
        return (0, utils_1.sendResponse)(res, {
            code: 200,
            status: "success",
            data: existingRating,
        });
    }
    catch (error) {
        next(error);
    }
});
const getRatings = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const ratings = yield models_1.RatingModel.findAll({
            include: [
                { model: models_1.UserModel, attributes: { exclude: ["password"] } },
                {
                    model: models_1.ComicModel,
                },
            ],
        });
        return (0, utils_1.sendResponse)(res, {
            code: 200,
            status: "success",
            data: ratings,
        });
    }
    catch (error) { }
});
const RatingController = {
    rating,
    deleteRating,
    getUserRatingByMovie,
    getRatings,
};
exports.default = RatingController;
