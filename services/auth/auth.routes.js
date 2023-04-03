const { Router } = require('express');
const { Login } = require('./auth.controller');
const authRouter = Router();

authRouter.get('/login', Login);

module.exports = {
  authRouter
}