const { Router } = require('express');

const { authRouter } = require('../services/auth/auth.routes');

const router = Router();

router.use('/auth', authRouter);

module.exports = router;