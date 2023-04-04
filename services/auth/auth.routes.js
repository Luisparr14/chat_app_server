const { Router } = require('express');
const { Register, Login, RenewToken } = require('./auth.controller');
const { RegisterMiddlewares, LoginMiddlewares,  } = require('../../middlewares/authMiddleware');
const { checkErrors } = require('../../middlewares/customMiddlewares');
const { checkJWT } = require('../../middlewares/verify-jwt');
const authRouter = Router();

authRouter.post('/register',[ RegisterMiddlewares ,checkErrors ], Register);
authRouter.post('/login', [LoginMiddlewares, checkErrors], Login);
authRouter.get('/renew', [checkJWT, checkErrors], RenewToken);

module.exports = {
  authRouter
}