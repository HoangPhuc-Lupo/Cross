import {
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";

export interface User
  extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
  id: CreationOptional<number>;
  fullname: string;
  username: string;
  password?: string;
  photoURL?: string;
  isAdmin?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  email?: string;
}
