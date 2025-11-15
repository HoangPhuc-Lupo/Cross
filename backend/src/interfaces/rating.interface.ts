import {
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";

export interface Rating
  extends Model<InferAttributes<Rating>, InferCreationAttributes<Rating>> {
  id: CreationOptional<number>;
  userId?: number;
  comicId?: number;
  createdAt?: Date;
  updatedAt?: Date;
  rating: number;
}
