"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const config_1 = require("../config");
const utils_1 = require("../utils");
const ChapterModel = config_1.connection.define(utils_1.TABLE_NAME.CHAPTERS, {
    id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    title: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    image: {
        type: sequelize_1.DataTypes.TEXT("long"),
        allowNull: false,
        // get() {
        //   const value: any = this.getDataValue("image");
        //   return value ? value.split(", ") : [];
        // },
        // set(value: string[]) {
        //   this.setDataValue("image", value.join(", ") as any);
        // },
        get() {
            const value = this.getDataValue("image");
            return value ? JSON.parse(value) : [];
        },
        set(value) {
            this.setDataValue("image", JSON.stringify(value));
        },
    },
});
exports.default = ChapterModel;
