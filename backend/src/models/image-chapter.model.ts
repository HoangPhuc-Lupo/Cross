import { DataTypes } from "sequelize";
import { connection } from "../config";

import { ImageChapter } from "../interfaces";
import { TABLE_NAME } from "../utils";

const ImageChapterModel = connection.define<ImageChapter>(
  TABLE_NAME.IMAGES_CHAPTER,
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    image: {
      type: DataTypes.TEXT("long"),
      allowNull: false,
    },
  }
);

export default ImageChapterModel;
