const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");

/**
 *@route GET /api/user
 *@description Get list user with pagination
 *@access Public
 */
router.get("/", userController.get);

/**
 *@route POST /api/user/like
 *@description Like a user
 *@access Public
 */
router.post("/like", userController.like);
/**
 *@route POST /api/user/pass
 *@description Pass a user
 *@access
 */
router.post("/pass", userController.pass);
/**
 *@route GET /api/user/like
 *@description Get list liked user
 *@access Public
 */
router.get("/like", userController.getListLike);

/**
 *@route GET /api/user/pass
 *@description Get list passed user
 *@access Public
 */
router.get("/pass", userController.getListPass);

/**
 *@route GET /api/user/match
 *@description Get list matched user
 *@access Public
 */
router.get("/match", userController.getListMatch);
/**
 *@route GET /api/user/me
 *@description Get current user
 *@access Public
 */
router.get("/me", userController.getCurrentUser);
/**
 *@route GET /api/user/:id
 *@description Get detail user
 *@access Public
 */
router.get("/:id", userController.getById);

module.exports = router;
