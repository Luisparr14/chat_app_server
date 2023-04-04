const { Router } = require('express');
const { Login } = require('./auth.controller');
const { authMiddleware } = require('../../middlewares/authMiddleware');
const { checkErros } = require('../../middlewares/customMiddlewares');
const { body, check } = require('express-validator');
const authRouter = Router();

authRouter.post('/login',[ authMiddleware ,checkErros ], Login);

module.exports = {
  authRouter
}