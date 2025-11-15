import {
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";

export interface Favorite
  extends Model<InferAttributes<Favorite>, InferCreationAttributes<Favorite>> {
  id: CreationOptional<number>;
  userId?: number;
  comicId?: number;
  createdAt?: Date;
  updatedAt?: Date;
}
