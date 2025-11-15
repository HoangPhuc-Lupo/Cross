import { Router } from "express";
import { FavoriteController } from "../controllers";
import { authenticateToken, checkRole } from "../middlewares";

const router = Router();

/** create favorire */
router.post(
  "/comic/:comicId/favorites",
  [authenticateToken, checkRole(["user"])],
  FavoriteController.createFavorite
);

/** delete favorire */
router.delete(
  "/comic/:comicId/favorites",
  [authenticateToken, checkRole(["user"])],
  FavoriteController.deleteFavorite
);

export default router;
