"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const genre_controller_1 = __importDefault(require("../controllers/genre.controller"));
const middlewares_1 = require("../middlewares");
const schemas_1 = require("../schemas");
const router = (0, express_1.Router)();
/** get all genre */
router.get("/genres", genre_controller_1.default.getGenres);
/** create genre */
router.post("/genres", [middlewares_1.authenticateToken, (0, middlewares_1.checkRole)(["admin"])], (0, middlewares_1.validateRequestSchema)(schemas_1.createGenreSchema), genre_controller_1.default.createGenre);
/** update genre */
router.put("/genres/:genreId", [middlewares_1.authenticateToken, (0, middlewares_1.checkRole)(["admin"])], (0, middlewares_1.validateRequestSchema)(schemas_1.updateGenreSchema), genre_controller_1.default.updateGenre);
/** delete genre*/
router.delete("/genres/:genreId", [middlewares_1.authenticateToken, (0, middlewares_1.checkRole)(["admin"])], (0, middlewares_1.validateRequestSchema)(schemas_1.deleteGenreSchema), genre_controller_1.default.deleteGenre);
exports.default = router;
