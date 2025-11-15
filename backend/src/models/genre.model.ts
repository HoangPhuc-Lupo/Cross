import { DataTypes } from "sequelize";
import { connection } from "../config";

import { Genre } from "../interfaces";
import { TABLE_NAME } from "../utils";

const GenreModel = connection.define<Genre>(TABLE_NAME.GENRES, {
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export default GenreModel;
