"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JWT_SECRET_KEY = exports.MAX_PASSWORD_LENGTH = exports.MIN_PASSWORD_LENGTH = exports.TABLE_NAME = void 0;
var TABLE_NAME;
(function (TABLE_NAME) {
    TABLE_NAME["USERS"] = "users";
    TABLE_NAME["GENRES"] = "genres";
    TABLE_NAME["COMICS"] = "comics";
    TABLE_NAME["CHAPTERS"] = "chapters";
    TABLE_NAME["RATINGS"] = "ratings";
    TABLE_NAME["COMMENTS"] = "comments";
    TABLE_NAME["IMAGES_CHAPTER"] = "images_chapter";
    TABLE_NAME["FAVORITES"] = "favorites";
    TABLE_NAME["COUNTS"] = "counts";
})(TABLE_NAME || (exports.TABLE_NAME = TABLE_NAME = {}));
exports.MIN_PASSWORD_LENGTH = 8;
exports.MAX_PASSWORD_LENGTH = 20;
exports.JWT_SECRET_KEY = "comicbooks";
