"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = exports.GenreRoutes = exports.FavoriteRoutes = exports.CountRoutes = exports.ComicRoutes = void 0;
var comic_route_1 = require("./comic.route");
Object.defineProperty(exports, "ComicRoutes", { enumerable: true, get: function () { return __importDefault(comic_route_1).default; } });
var count_route_1 = require("./count.route");
Object.defineProperty(exports, "CountRoutes", { enumerable: true, get: function () { return __importDefault(count_route_1).default; } });
var favorite_route_1 = require("./favorite.route");
Object.defineProperty(exports, "FavoriteRoutes", { enumerable: true, get: function () { return __importDefault(favorite_route_1).default; } });
var genre_route_1 = require("./genre.route");
Object.defineProperty(exports, "GenreRoutes", { enumerable: true, get: function () { return __importDefault(genre_route_1).default; } });
var user_route_1 = require("./user.route");
Object.defineProperty(exports, "UserRoutes", { enumerable: true, get: function () { return __importDefault(user_route_1).default; } });
