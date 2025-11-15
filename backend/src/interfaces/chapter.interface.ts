import {
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";

export interface Chapter
  extends Model<InferAttributes<Chapter>, InferCreationAttributes<Chapter>> {
  id: CreationOptional<number>;
  comicId?: number;
  title: string;
  image: string;
  createdAt?: Date;
  updatedAt?: Date;
}
