"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const config_1 = require("../config");
const utils_1 = require("../utils");
const ComicModel = config_1.connection.define(utils_1.TABLE_NAME.COMICS, {
    id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    title: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: sequelize_1.DataTypes.TEXT("long"),
        allowNull: false,
    },
    poster: {
        type: sequelize_1.DataTypes.TEXT("long"),
        allowNull: false,
    },
    status: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
});
exports.default = ComicModel;
