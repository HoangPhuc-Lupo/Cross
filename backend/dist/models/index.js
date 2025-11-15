"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = exports.RatingModel = exports.ImageChapter = exports.GenreModel = exports.FavoriteModel = exports.CountModel = exports.CommentModel = exports.ComicModel = exports.ChapterModel = void 0;
/** imports */
const chapter_model_1 = __importDefault(require("./chapter.model"));
const comic_model_1 = __importDefault(require("./comic.model"));
const comment_model_1 = __importDefault(require("./comment.model"));
const count_model_1 = __importDefault(require("./count.model"));
const favorite_model_1 = __importDefault(require("./favorite.model"));
const genre_model_1 = __importDefault(require("./genre.model"));
const image_chapter_model_1 = __importDefault(require("./image-chapter.model"));
const rating_model_1 = __importDefault(require("./rating.model"));
const user_model_1 = __importDefault(require("./user.model"));
/** exports */
var chapter_model_2 = require("./chapter.model");
Object.defineProperty(exports, "ChapterModel", { enumerable: true, get: function () { return __importDefault(chapter_model_2).default; } });
var comic_model_2 = require("./comic.model");
Object.defineProperty(exports, "ComicModel", { enumerable: true, get: function () { return __importDefault(comic_model_2).default; } });
var comment_model_2 = require("./comment.model");
Object.defineProperty(exports, "CommentModel", { enumerable: true, get: function () { return __importDefault(comment_model_2).default; } });
var count_model_2 = require("./count.model");
Object.defineProperty(exports, "CountModel", { enumerable: true, get: function () { return __importDefault(count_model_2).default; } });
var favorite_model_2 = require("./favorite.model");
Object.defineProperty(exports, "FavoriteModel", { enumerable: true, get: function () { return __importDefault(favorite_model_2).default; } });
var genre_model_2 = require("./genre.model");
Object.defineProperty(exports, "GenreModel", { enumerable: true, get: function () { return __importDefault(genre_model_2).default; } });
var image_chapter_model_2 = require("./image-chapter.model");
Object.defineProperty(exports, "ImageChapter", { enumerable: true, get: function () { return __importDefault(image_chapter_model_2).default; } });
var rating_model_2 = require("./rating.model");
Object.defineProperty(exports, "RatingModel", { enumerable: true, get: function () { return __importDefault(rating_model_2).default; } });
var user_model_2 = require("./user.model");
Object.defineProperty(exports, "UserModel", { enumerable: true, get: function () { return __importDefault(user_model_2).default; } });
// Establish relationships between Comic, Genre.
genre_model_1.default.hasMany(comic_model_1.default);
comic_model_1.default.belongsTo(genre_model_1.default, {
    foreignKey: "genreId",
});
// Establish relationships between Comic, Chapter.
comic_model_1.default.hasMany(chapter_model_1.default);
chapter_model_1.default.belongsTo(comic_model_1.default, {
    foreignKey: "comicId",
});
// Establish relationships between Chapter, ImageChapter.
chapter_model_1.default.hasMany(image_chapter_model_1.default);
image_chapter_model_1.default.belongsTo(chapter_model_1.default, {
    foreignKey: "chapterId",
});
// Establish relationships between User, Rating.
user_model_1.default.hasMany(rating_model_1.default);
rating_model_1.default.belongsTo(user_model_1.default, {
    foreignKey: "userId",
});
// Establish relationships between Comic, Rating.
comic_model_1.default.hasMany(rating_model_1.default);
rating_model_1.default.belongsTo(comic_model_1.default, {
    foreignKey: "comicId",
});
// Establish relationships between User, Comment.
user_model_1.default.hasMany(comment_model_1.default);
comment_model_1.default.belongsTo(user_model_1.default, {
    foreignKey: "userId",
});
// Establish relationships between Comic, Comment.
comic_model_1.default.hasMany(comment_model_1.default);
comment_model_1.default.belongsTo(comic_model_1.default, {
    foreignKey: "comicId",
});
// Establish relationships between User, Favorie.
user_model_1.default.hasMany(favorite_model_1.default);
favorite_model_1.default.belongsTo(user_model_1.default, {
    foreignKey: "userId",
});
// Establish relationships between Comic, Favorie.
comic_model_1.default.hasMany(favorite_model_1.default);
favorite_model_1.default.belongsTo(comic_model_1.default, {
    foreignKey: "comicId",
});
// Establish relationships between User, Count.
user_model_1.default.hasMany(count_model_1.default);
count_model_1.default.belongsTo(user_model_1.default, {
    foreignKey: "userId",
});
// Establish relationships between Comic, Count.
comic_model_1.default.hasMany(count_model_1.default);
count_model_1.default.belongsTo(comic_model_1.default, {
    foreignKey: "comicId",
});
