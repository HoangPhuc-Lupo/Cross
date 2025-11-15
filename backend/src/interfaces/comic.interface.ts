import {
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";

export interface Comic
  extends Model<InferAttributes<Comic>, InferCreationAttributes<Comic>> {
  id: CreationOptional<number>;
  title: string;
  description: string;
  poster: string;
  genreId?: number;
  status: "process" | "end";
  createdAt?: Date;
  updatedAt?: Date;
}
