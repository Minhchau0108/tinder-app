const responseService = require("../services/response.service");
const userService = require("../services/user.service");

const userController = {};

// Get list user
userController.get = async (req, res, next) => {
  try {
    const currentUserId = req.app.locals.currentUserId;
    const { users, totalPages } = await userService.get(
      req.query,
      currentUserId
    );
    responseService.send(res, 200, true, { users, totalPages }, null);
  } catch (error) {
    next(error);
  }
};

// Get user by ID
userController.getById = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const user = await userService.getById(userId);
    responseService.send(res, 200, true, { user }, null);
  } catch (error) {
    next(error);
  }
};

// Like one user
userController.like = async (req, res, next) => {
  try {
    const { currentUserId, userId } = req.body;
    if (!userId || !currentUserId) {
      responseService.send(res, 400, false, null, "Data Invalid");
      return;
    }
    const result = await userService.like(currentUserId, userId);
    responseService.send(res, 200, true, { result }, null);
  } catch (error) {
    next(error);
  }
};

// Pass one user
userController.pass = async (req, res, next) => {
  try {
    const { currentUserId, userId } = req.body;
    if (!userId || !currentUserId) {
      responseService.send(res, 400, false, null, "Data Invalid");
      return;
    }
    await userService.pass(currentUserId, userId);
    responseService.send(res, 200, true, null, null);
  } catch (error) {
    next(error);
  }
};

// Note: this is GET request so that we cannot get currentUserId from client. We'll get it from `req.app.locals` instead.
userController.getListLike = async (req, res, next) => {
  try {
    const currentUserId = req.app.locals.currentUserId;
    const users = await userService.getListLike(currentUserId);
    responseService.send(res, 200, true, { users }, null);
  } catch (error) {
    next(error);
  }
};

userController.getListPass = async (req, res, next) => {
  try {
    const currentUserId = req.app.locals.currentUserId;
    const users = await userService.getListPass(currentUserId);
    responseService.send(res, 200, true, { users }, null);
  } catch (error) {
    next(error);
  }
};

userController.getListMatch = async (req, res, next) => {
  try {
    const currentUserId = req.app.locals.currentUserId;
    const users = await userService.getListMatch(currentUserId);
    responseService.send(res, 200, true, { users }, null);
  } catch (error) {
    next(error);
  }
};

// Get current user
userController.getCurrentUser = async (req, res, next) => {
  try {
    const currentUserId = req.app.locals.currentUserId;
    const user = await userService.getById(currentUserId);
    responseService.send(res, 200, true, { user }, null);
  } catch (error) {
    next(error);
  }
};

module.exports = userController;
