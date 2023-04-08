const { Router } = require('express');
const { checkJWT } = require('../../middlewares/verify-jwt');
const { getMessages } = require('./messages.controller');
const messagesRouter = Router();

messagesRouter.get('/:from', checkJWT, getMessages);

module.exports = {
  messagesRouter
}
