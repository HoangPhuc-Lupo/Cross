import {
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";

export interface Comment
  extends Model<InferAttributes<Comment>, InferCreationAttributes<Comment>> {
  id: CreationOptional<number>;
  text: string;
  userId?: number;
  comicId?: number;
  createdAt?: Date;
  updatedAt?: Date;
}
