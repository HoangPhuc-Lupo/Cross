import { DataTypes } from "sequelize";
import { connection } from "../config";
import { Comic } from "../interfaces";
import { TABLE_NAME } from "../utils";

const ComicModel = connection.define<Comic>(TABLE_NAME.COMICS, {
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT("long"),
    allowNull: false,
  },
  poster: {
    type: DataTypes.TEXT("long"),
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export default ComicModel;
