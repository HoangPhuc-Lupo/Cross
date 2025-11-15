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
const createGenre = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { title } = req.body;
    try {
        const newGenre = yield models_1.GenreModel.sync({
            alter: true,
        }).then(() => {
            return models_1.GenreModel.create({
                title,
            });
        });
        return (0, utils_1.sendResponse)(res, {
            code: 201,
            status: "success",
            message: "Thêm thể loại thành công",
            data: newGenre,
        });
    }
    catch (error) {
        next(error);
    }
});
const updateGenre = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { title } = req.body;
    const { genreId } = req.params;
    try {
        const existingGenre = yield models_1.GenreModel.findByPk(genreId);
        if (!existingGenre) {
            return (0, utils_1.sendResponse)(res, {
                code: 404,
                status: "error",
                message: "Không tìm thấy thể loại này",
            });
        }
        title && existingGenre.update({ title });
        return (0, utils_1.sendResponse)(res, {
            code: 200,
            status: "success",
            data: existingGenre,
        });
    }
    catch (error) {
        next(error);
    }
});
const deleteGenre = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { genreId } = req.params;
    try {
        const existingGenre = yield models_1.GenreModel.findByPk(genreId);
        if (!existingGenre) {
            return (0, utils_1.sendResponse)(res, {
                code: 404,
                status: "error",
                message: "Không tìm thấy thể loại này",
            });
        }
        existingGenre.destroy();
        return (0, utils_1.sendResponse)(res, {
            code: 200,
            status: "success",
            message: "Xoá thể loại thành công",
        });
    }
    catch (error) {
        next(error);
    }
});
const getGenres = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const genres = yield models_1.GenreModel.findAll();
        return (0, utils_1.sendResponse)(res, {
            code: 200,
            status: "success",
            data: genres,
        });
    }
    catch (error) {
        next(error);
    }
});
const GenreController = {
    createGenre,
    updateGenre,
    deleteGenre,
    getGenres,
};
exports.default = GenreController;
