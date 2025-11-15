import {
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";

export interface Count
  extends Model<InferAttributes<Count>, InferCreationAttributes<Count>> {
  id: CreationOptional<number>;
  userId?: number;
  comicId?: number;
  createdAt?: Date;
  updatedAt?: Date;
}
