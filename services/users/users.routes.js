const { Router } = require('express');
const { getUsers } = require('./users.controller');
const { checkJWT } = require('../../middlewares/verify-jwt');
const { checkErrors } = require('../../middlewares/customMiddlewares');
const usersRouter = Router();

usersRouter.get('/', [checkJWT, checkErrors], getUsers);

module.exports = {
  usersRouter
}
