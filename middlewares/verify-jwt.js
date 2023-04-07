const { verifyJWT } = require('../utils/jwt');

const checkJWT = (req, res, next) => {
  const token = req.header('x-token');
  if (!token) {
    return res.status(401).send({
      ok: false,
      message: 'No token provided',
    });
  }

  try {
    const { uid, valid } = verifyJWT(token);
    if (!valid) {
      return res.status(401).send({
        ok: false,
        message: 'Invalid token',
      });
    }
    req.uid = uid;
    next();
  } catch (error) {
    return res.status(500).send({
      ok: false,
      message: 'Something went wrong',
    });
  }
}

module.exports = {
  checkJWT,
};