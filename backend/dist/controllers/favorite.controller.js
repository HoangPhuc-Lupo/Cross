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
const createFavorite = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { comicId } = req.params;
        const userId = req.user.id;
        const existingComic = yield models_1.ComicModel.findByPk(comicId);
        if (!existingComic) {
            return (0, utils_1.sendResponse)(res, {
                code: 404,
                status: "error",
                message: "Không tìm thấy truyện",
            });
        }
        const checkfavorite = yield models_1.FavoriteModel.findOne({
            where: {
                userId: req.user.id,
                comicId,
            },
        });
        if (checkfavorite) {
            return (0, utils_1.sendResponse)(res, {
                code: 400,
                status: "error",
                message: "Vui lòng thử lại",
            });
        }
        const favorite = yield models_1.FavoriteModel.sync({ alter: true }).then(() => {
            return models_1.FavoriteModel.create({
                comicId,
                userId,
            });
        });
        (0, utils_1.sendResponse)(res, {
            code: 201,
            status: "success",
            data: favorite,
        });
    }
    catch (error) {
        next(error);
    }
});
const deleteFavorite = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { comicId } = req.params;
        const favorite = yield models_1.FavoriteModel.findOne({
            where: {
                userId: req.user.id,
                comicId,
            },
        });
        if (!favorite) {
            return (0, utils_1.sendResponse)(res, {
                code: 404,
                status: "error",
                message: "Không tìm thấy truyện",
            });
        }
        favorite.destroy();
        return (0, utils_1.sendResponse)(res, {
            code: 200,
            status: "success",
            message: "Xoá yêu thích thành công.",
        });
    }
    catch (error) {
        next(error);
    }
});
const FavoriteController = {
    createFavorite: createFavorite,
    deleteFavorite: deleteFavorite,
};
exports.default = FavoriteController;
