"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = require("../controllers");
const middlewares_1 = require("../middlewares");
const router = (0, express_1.Router)();
/** create favorire */
router.post("/comic/:comicId/favorites", [middlewares_1.authenticateToken, (0, middlewares_1.checkRole)(["user"])], controllers_1.FavoriteController.createFavorite);
/** delete favorire */
router.delete("/comic/:comicId/favorites", [middlewares_1.authenticateToken, (0, middlewares_1.checkRole)(["user"])], controllers_1.FavoriteController.deleteFavorite);
exports.default = router;
