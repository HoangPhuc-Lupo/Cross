import {
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";

export interface ImageChapter
  extends Model<
    InferAttributes<ImageChapter>,
    InferCreationAttributes<ImageChapter>
  > {
  id: CreationOptional<number>;
  image: string;
  chapterId?: number;
  createdAt?: Date;
  updatedAt?: Date;
}
