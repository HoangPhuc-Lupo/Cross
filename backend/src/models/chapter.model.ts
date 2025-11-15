import { DataTypes } from "sequelize";
import { connection } from "../config";
import { Chapter } from "../interfaces";
import { TABLE_NAME } from "../utils";

const ChapterModel = connection.define<Chapter>(TABLE_NAME.CHAPTERS, {
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  image: {
    type: DataTypes.TEXT("long"),
    allowNull: false,
    // get() {
    //   const value: any = this.getDataValue("image");
    //   return value ? value.split(", ") : [];
    // },
    // set(value: string[]) {
    //   this.setDataValue("image", value.join(", ") as any);
    // },

    get() {
      const value: any = this.getDataValue("image");
      return value ? JSON.parse(value) : [];
    },
    set(value: string[]) {
      this.setDataValue("image", JSON.stringify(value) as any);
    },
  },
});

export default ChapterModel;
