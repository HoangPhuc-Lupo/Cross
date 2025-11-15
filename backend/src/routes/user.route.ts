import { Router } from "express";
import { UserController } from "../controllers";
import { authenticateToken, validateRequestSchema } from "../middlewares";
import { loginSchema, signupSchema, updateUserSchema } from "../schemas";

const router = Router();

/** sign up */
router.post(
  "/signup",
  validateRequestSchema(signupSchema),
  UserController.signUp
);

/** login */
router.post("/login", validateRequestSchema(loginSchema), UserController.login);

/** get user */
router.get("/profile", authenticateToken, UserController.getUser);

/** update user */
router.put(
  "/profile",
  authenticateToken,
  validateRequestSchema(updateUserSchema),
  UserController.updateUser
);

router.post("/forgot-password", UserController.forgotPassword);

router.post(
  "/change-password",
  authenticateToken,
  UserController.changePassword
);

export default router;
