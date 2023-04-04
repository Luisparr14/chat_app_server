const { Router } = require('express');
const { Register } = require('./auth.controller');
const { authMiddleware } = require('../../middlewares/authMiddleware');
const { checkErros } = require('../../middlewares/customMiddlewares');
const authRouter = Router();

authRouter.post('/register',[ authMiddleware ,checkErros ], Register);

module.exports = {
  authRouter
}