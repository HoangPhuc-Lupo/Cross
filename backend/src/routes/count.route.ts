import { Router } from "express";
import { CountController } from "../controllers";
import { authenticateToken, checkRole } from "../middlewares";

const router = Router();

router.get(
  "/comic/:comicId/view-count",
  authenticateToken,
  CountController.getCount
);

router.post(
  "/comic/:comicId/view-count",
  [authenticateToken, checkRole(["user"])],
  CountController.createCount
);

export default router;
