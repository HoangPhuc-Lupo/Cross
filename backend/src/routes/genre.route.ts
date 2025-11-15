import { Router } from "express";
import GenreController from "../controllers/genre.controller";
import {
  authenticateToken,
  checkRole,
  validateRequestSchema,
} from "../middlewares";
import {
  createGenreSchema,
  deleteGenreSchema,
  updateGenreSchema,
} from "../schemas";

const router = Router();

/** get all genre */
router.get("/genres", GenreController.getGenres);

/** create genre */
router.post(
  "/genres",
  [authenticateToken, checkRole(["admin"])],
  validateRequestSchema(createGenreSchema),
  GenreController.createGenre
);

/** update genre */
router.put(
  "/genres/:genreId",
  [authenticateToken, checkRole(["admin"])],
  validateRequestSchema(updateGenreSchema),
  GenreController.updateGenre
);

/** delete genre*/
router.delete(
  "/genres/:genreId",
  [authenticateToken, checkRole(["admin"])],
  validateRequestSchema(deleteGenreSchema),
  GenreController.deleteGenre
);

export default router;
