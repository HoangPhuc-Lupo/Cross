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
const createComment = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { comicId } = req.params;
        const { text } = req.body;
        const userId = req.user.id;
        const existingComic = yield models_1.ComicModel.findByPk(comicId);
        if (!existingComic) {
            return (0, utils_1.sendResponse)(res, {
                code: 404,
                status: "error",
                message: "Không tìm thấy truyện",
            });
        }
        const newComment = yield models_1.CommentModel.sync({ alter: true }).then(() => {
            return models_1.CommentModel.create({
                text,
                comicId,
                userId,
            });
        });
        (0, utils_1.sendResponse)(res, {
            code: 201,
            status: "success",
            data: newComment,
        });
    }
    catch (error) {
        next(error);
    }
});
const updateComment = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { commentId } = req.params;
        const { text } = req.body;
        const existingComment = yield models_1.CommentModel.findByPk(commentId);
        if (!existingComment) {
            return (0, utils_1.sendResponse)(res, {
                code: 404,
                status: "error",
                message: "Không tìm thấy bình luận",
            });
        }
        text &&
            existingComment.update({
                text: text,
            });
        return (0, utils_1.sendResponse)(res, {
            code: 200,
            status: "success",
            message: "Cập nhật bình luận thành công",
        });
    }
    catch (error) {
        next(error);
    }
});
const deleteComment = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { commentId } = req.params;
        const existingComment = yield models_1.CommentModel.findByPk(commentId);
        if (!existingComment) {
            return (0, utils_1.sendResponse)(res, {
                code: 404,
                status: "error",
                message: "Không tìm thấy bình luận",
            });
        }
        existingComment.destroy();
        return (0, utils_1.sendResponse)(res, {
            code: 204,
            status: "success",
            message: "Xoá bình luận thành công",
        });
    }
    catch (error) {
        next(error);
    }
});
const getCommentsByComic = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { comicId } = req.params;
        const existingComic = yield models_1.ComicModel.findByPk(comicId);
        if (!existingComic) {
            return (0, utils_1.sendResponse)(res, {
                code: 404,
                status: "error",
                message: "Không tìm thấy truyện",
            });
        }
        const comments = yield models_1.CommentModel.findAll({
            where: {
                comicId,
            },
            include: [
                {
                    model: models_1.UserModel,
                    attributes: { exclude: ["password", "isAdmin"] },
                },
            ],
        });
        return (0, utils_1.sendResponse)(res, {
            code: 200,
            status: "success",
            data: comments,
        });
    }
    catch (error) {
        next(error);
    }
});
const getComments = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const comments = yield models_1.CommentModel.findAll({
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
            data: comments,
        });
    }
    catch (error) { }
});
const CommentController = {
    createComment,
    updateComment,
    deleteComment,
    getCommentsByComic,
    getComments,
};
exports.default = CommentController;
