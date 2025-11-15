"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = require("../controllers");
const middlewares_1 = require("../middlewares");
const schemas_1 = require("../schemas");
const router = (0, express_1.Router)();
/** sign up */
router.post("/signup", (0, middlewares_1.validateRequestSchema)(schemas_1.signupSchema), controllers_1.UserController.signUp);
/** login */
router.post("/login", (0, middlewares_1.validateRequestSchema)(schemas_1.loginSchema), controllers_1.UserController.login);
/** get user */
router.get("/profile", middlewares_1.authenticateToken, controllers_1.UserController.getUser);
/** update user */
router.put("/profile", middlewares_1.authenticateToken, (0, middlewares_1.validateRequestSchema)(schemas_1.updateUserSchema), controllers_1.UserController.updateUser);
router.post("/forgot-password", controllers_1.UserController.forgotPassword);
router.post("/change-password", middlewares_1.authenticateToken, controllers_1.UserController.changePassword);
exports.default = router;
