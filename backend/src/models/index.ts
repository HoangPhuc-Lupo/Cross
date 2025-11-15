/** imports */
import ChapterModel from "./chapter.model";
import ComicModel from "./comic.model";
import CommentModel from "./comment.model";
import CountModel from "./count.model";
import FavoriteModel from "./favorite.model";
import GenreModel from "./genre.model";
import ImageChapterModel from "./image-chapter.model";
import RatingModel from "./rating.model";
import UserModel from "./user.model";

/** exports */
export { default as ChapterModel } from "./chapter.model";
export { default as ComicModel } from "./comic.model";
export { default as CommentModel } from "./comment.model";
export { default as CountModel } from "./count.model";
export { default as FavoriteModel } from "./favorite.model";
export { default as GenreModel } from "./genre.model";
export { default as ImageChapter } from "./image-chapter.model";
export { default as RatingModel } from "./rating.model";
export { default as UserModel } from "./user.model";

// Establish relationships between Comic, Genre.
GenreModel.hasMany(ComicModel);
ComicModel.belongsTo(GenreModel, {
  foreignKey: "genreId",
});

// Establish relationships between Comic, Chapter.
ComicModel.hasMany(ChapterModel);
ChapterModel.belongsTo(ComicModel, {
  foreignKey: "comicId",
});

// Establish relationships between Chapter, ImageChapter.
ChapterModel.hasMany(ImageChapterModel);
ImageChapterModel.belongsTo(ChapterModel, {
  foreignKey: "chapterId",
});

// Establish relationships between User, Rating.
UserModel.hasMany(RatingModel);
RatingModel.belongsTo(UserModel, {
  foreignKey: "userId",
});

// Establish relationships between Comic, Rating.
ComicModel.hasMany(RatingModel);
RatingModel.belongsTo(ComicModel, {
  foreignKey: "comicId",
});

// Establish relationships between User, Comment.
UserModel.hasMany(CommentModel);
CommentModel.belongsTo(UserModel, {
  foreignKey: "userId",
});

// Establish relationships between Comic, Comment.
ComicModel.hasMany(CommentModel);
CommentModel.belongsTo(ComicModel, {
  foreignKey: "comicId",
});

// Establish relationships between User, Favorie.
UserModel.hasMany(FavoriteModel);
FavoriteModel.belongsTo(UserModel, {
  foreignKey: "userId",
});

// Establish relationships between Comic, Favorie.
ComicModel.hasMany(FavoriteModel);
FavoriteModel.belongsTo(ComicModel, {
  foreignKey: "comicId",
});

// Establish relationships between User, Count.
UserModel.hasMany(CountModel);
CountModel.belongsTo(UserModel, {
  foreignKey: "userId",
});

// Establish relationships between Comic, Count.
ComicModel.hasMany(CountModel);
CountModel.belongsTo(ComicModel, {
  foreignKey: "comicId",
});
