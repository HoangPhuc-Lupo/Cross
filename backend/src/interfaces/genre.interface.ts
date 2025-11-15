import {
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";

export interface Genre
  extends Model<InferAttributes<Genre>, InferCreationAttributes<Genre>> {
  id: CreationOptional<number>;
  title: string;
  createdAt?: Date;
  updatedAt?: Date;
}
