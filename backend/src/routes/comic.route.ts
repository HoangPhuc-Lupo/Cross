import { Router } from "express";
import {
  ComicController,
  CommentController,
  RatingController,
} from "../controllers";
import {
  authenticateToken,
  checkRole,
  validateRequestSchema,
} from "../middlewares";

import {
  createComicSchema,
  createCommentSchema,
  deleteChapterSchema,
  deleteComicSchema,
  deleteCommentSchema,
  deleteRatingSchema,
  getChaptersByComicSchema,
  getComicsChartSchema,
  getComicsSchema,
  getCommentByComicSchema,
  getUserRatingByComic,
  ratingSchema,
  searchComicSchema,
  updateComicSchema,
  updateCommentSchema,
} from "../schemas";

const router = Router();

/** search comics */

router.get(
  "/comics/search/:query",
  validateRequestSchema(searchComicSchema),
  ComicController.searchComic
);

/** create comic */
router.post(
  "/comics",
  [authenticateToken, checkRole(["admin"])],
  validateRequestSchema(createComicSchema),
  ComicController.createComic
);

/** update comic */
router.put(
  "/comics/:id",
  [authenticateToken, checkRole(["admin"])],
  validateRequestSchema(updateComicSchema),
  ComicController.updateComic
);

/** delete comic*/
router.delete(
  "/comics/:id",
  [authenticateToken, checkRole(["admin"])],
  validateRequestSchema(deleteComicSchema),
  ComicController.deleteComic
);

/** get  comic */
router.get("/comics/:comicId", authenticateToken, ComicController.getComic);

/** get all comic */
router.get(
  "/comics",
  validateRequestSchema(getComicsSchema),
  ComicController.getComics
);

/** */
router.get("/comics/genres/:genreId", ComicController.getComicsByGenre);

/** create chapter */
router.post(
  "/:comicId/chapters",
  [authenticateToken, checkRole(["admin"])],
  // validateRequestSchema(createChapterSchema),
  ComicController.createChapter
);

/** update chapter */
router.put(
  "/chapters/:chapterId",
  [authenticateToken, checkRole(["admin"])],
  // validateRequestSchema(updateChapterSchema),
  ComicController.updateChapter
);

/** get chappter */
router.get(
  "/chapters/:chapterId",
  // [authenticateToken, checkRole(["admin"])],
  // validateRequestSchema(updateChapterSchema),
  ComicController.getChapter
);
/** delete chapter */
router.delete(
  "/chapters/:chapterId",
  [authenticateToken, checkRole(["admin"])],
  validateRequestSchema(deleteChapterSchema),
  ComicController.deleteChapter
);

/** get all chapter */
router.get(
  "/:comicId/chapters",
  validateRequestSchema(getChaptersByComicSchema),
  ComicController.getChaptersByComic
);

/** get comment by comic */
router.get(
  "/:comicId/comments",
  validateRequestSchema(getCommentByComicSchema),
  CommentController.getCommentsByComic
);

/** create comment */
router.post(
  "/:comicId/comments",
  [authenticateToken, checkRole(["user", "admin"])],
  validateRequestSchema(createCommentSchema),
  CommentController.createComment
);

/** update comment */
router.put(
  "/comments/:commentId",
  [authenticateToken, checkRole(["user"])],
  validateRequestSchema(updateCommentSchema),
  CommentController.updateComment
);

/** delete comment */
router.delete(
  "/comments/:commentId",
  [authenticateToken, checkRole(["admin", "user"])],
  validateRequestSchema(deleteCommentSchema),
  CommentController.deleteComment
);

/** create/update rating */
router.post(
  "/:comicId/ratings",
  [authenticateToken, checkRole(["user"])],
  validateRequestSchema(ratingSchema),
  RatingController.rating
);

/**  */
router.get(
  "/:comicId/ratings",
  [authenticateToken],
  validateRequestSchema(getUserRatingByComic),
  RatingController.getUserRatingByMovie
);

/** delete rating */
router.delete(
  "/ratings/:ratingId",
  [authenticateToken, checkRole(["admin", "user"])],
  validateRequestSchema(deleteRatingSchema),
  RatingController.deleteRating
);

/**   */
router.post("/chapters/images", ComicController.createImageChapter);

/**   */
router.get("/comments", CommentController.getComments);

/**  */
router.get("/ratings", RatingController.getRatings);

/**  */
router.get(
  "/comic-chart",
  validateRequestSchema(getComicsChartSchema),
  ComicController.getComicsChart
);

router.get(
  "/favorites",
  [authenticateToken, checkRole(["user"])],
  ComicController.getComicsByFavorite
);

export default router;
