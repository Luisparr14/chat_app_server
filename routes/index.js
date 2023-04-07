const { Router } = require('express');

const { authRouter } = require('../services/auth/auth.routes');
const { usersRouter } = require('../services/users/users.routes');
const router = Router();

router.use('/auth', authRouter);
router.use('/users', usersRouter);

module.exports = router;