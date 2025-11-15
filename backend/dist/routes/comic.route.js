"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = require("../controllers");
const middlewares_1 = require("../middlewares");
const schemas_1 = require("../schemas");
const router = (0, express_1.Router)();
/** search comics */
router.get("/comics/search/:query", (0, middlewares_1.validateRequestSchema)(schemas_1.searchComicSchema), controllers_1.ComicController.searchComic);
/** create comic */
router.post("/comics", [middlewares_1.authenticateToken, (0, middlewares_1.checkRole)(["admin"])], (0, middlewares_1.validateRequestSchema)(schemas_1.createComicSchema), controllers_1.ComicController.createComic);
/** update comic */
router.put("/comics/:id", [middlewares_1.authenticateToken, (0, middlewares_1.checkRole)(["admin"])], (0, middlewares_1.validateRequestSchema)(schemas_1.updateComicSchema), controllers_1.ComicController.updateComic);
/** delete comic*/
router.delete("/comics/:id", [middlewares_1.authenticateToken, (0, middlewares_1.checkRole)(["admin"])], (0, middlewares_1.validateRequestSchema)(schemas_1.deleteComicSchema), controllers_1.ComicController.deleteComic);
/** get  comic */
router.get("/comics/:comicId", middlewares_1.authenticateToken, controllers_1.ComicController.getComic);
/** get all comic */
router.get("/comics", (0, middlewares_1.validateRequestSchema)(schemas_1.getComicsSchema), controllers_1.ComicController.getComics);
/** */
router.get("/comics/genres/:genreId", controllers_1.ComicController.getComicsByGenre);
/** create chapter */
router.post("/:comicId/chapters", [middlewares_1.authenticateToken, (0, middlewares_1.checkRole)(["admin"])], 
// validateRequestSchema(createChapterSchema),
controllers_1.ComicController.createChapter);
/** update chapter */
router.put("/chapters/:chapterId", [middlewares_1.authenticateToken, (0, middlewares_1.checkRole)(["admin"])], 
// validateRequestSchema(updateChapterSchema),
controllers_1.ComicController.updateChapter);
/** get chappter */
router.get("/chapters/:chapterId", 
// [authenticateToken, checkRole(["admin"])],
// validateRequestSchema(updateChapterSchema),
controllers_1.ComicController.getChapter);
/** delete chapter */
router.delete("/chapters/:chapterId", [middlewares_1.authenticateToken, (0, middlewares_1.checkRole)(["admin"])], (0, middlewares_1.validateRequestSchema)(schemas_1.deleteChapterSchema), controllers_1.ComicController.deleteChapter);
/** get all chapter */
router.get("/:comicId/chapters", (0, middlewares_1.validateRequestSchema)(schemas_1.getChaptersByComicSchema), controllers_1.ComicController.getChaptersByComic);
/** get comment by comic */
router.get("/:comicId/comments", (0, middlewares_1.validateRequestSchema)(schemas_1.getCommentByComicSchema), controllers_1.CommentController.getCommentsByComic);
/** create comment */
router.post("/:comicId/comments", [middlewares_1.authenticateToken, (0, middlewares_1.checkRole)(["user", "admin"])], (0, middlewares_1.validateRequestSchema)(schemas_1.createCommentSchema), controllers_1.CommentController.createComment);
/** update comment */
router.put("/comments/:commentId", [middlewares_1.authenticateToken, (0, middlewares_1.checkRole)(["user"])], (0, middlewares_1.validateRequestSchema)(schemas_1.updateCommentSchema), controllers_1.CommentController.updateComment);
/** delete comment */
router.delete("/comments/:commentId", [middlewares_1.authenticateToken, (0, middlewares_1.checkRole)(["admin", "user"])], (0, middlewares_1.validateRequestSchema)(schemas_1.deleteCommentSchema), controllers_1.CommentController.deleteComment);
/** create/update rating */
router.post("/:comicId/ratings", [middlewares_1.authenticateToken, (0, middlewares_1.checkRole)(["user"])], (0, middlewares_1.validateRequestSchema)(schemas_1.ratingSchema), controllers_1.RatingController.rating);
/**  */
router.get("/:comicId/ratings", [middlewares_1.authenticateToken], (0, middlewares_1.validateRequestSchema)(schemas_1.getUserRatingByComic), controllers_1.RatingController.getUserRatingByMovie);
/** delete rating */
router.delete("/ratings/:ratingId", [middlewares_1.authenticateToken, (0, middlewares_1.checkRole)(["admin", "user"])], (0, middlewares_1.validateRequestSchema)(schemas_1.deleteRatingSchema), controllers_1.RatingController.deleteRating);
/**   */
router.post("/chapters/images", controllers_1.ComicController.createImageChapter);
/**   */
router.get("/comments", controllers_1.CommentController.getComments);
/**  */
router.get("/ratings", controllers_1.RatingController.getRatings);
/**  */
router.get("/comic-chart", (0, middlewares_1.validateRequestSchema)(schemas_1.getComicsChartSchema), controllers_1.ComicController.getComicsChart);
router.get("/favorites", [middlewares_1.authenticateToken, (0, middlewares_1.checkRole)(["user"])], controllers_1.ComicController.getComicsByFavorite);
exports.default = router;
