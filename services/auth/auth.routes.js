const { Router } = require('express');
const { Register, Login } = require('./auth.controller');
const { RegisterMiddlewares, LoginMiddlewares } = require('../../middlewares/authMiddleware');
const { checkErros } = require('../../middlewares/customMiddlewares');
const authRouter = Router();

authRouter.post('/register',[ RegisterMiddlewares ,checkErros ], Register);
authRouter.post('/login', [LoginMiddlewares, checkErros], Login);

module.exports = {
  authRouter
}