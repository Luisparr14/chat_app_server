const { Router } = require('express');

const { authRouter } = require('../services/auth/auth.routes');
const { usersRouter } = require('../services/users/users.routes');
const { messagesRouter } = require('../services/messages/messages.routes');
const router = Router();

router.use('/auth', authRouter);
router.use('/users', usersRouter);
router.use('/messages', messagesRouter);

module.exports = router;