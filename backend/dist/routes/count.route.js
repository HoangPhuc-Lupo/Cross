"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = require("../controllers");
const middlewares_1 = require("../middlewares");
const router = (0, express_1.Router)();
router.get("/comic/:comicId/view-count", middlewares_1.authenticateToken, controllers_1.CountController.getCount);
router.post("/comic/:comicId/view-count", [middlewares_1.authenticateToken, (0, middlewares_1.checkRole)(["user"])], controllers_1.CountController.createCount);
exports.default = router;
