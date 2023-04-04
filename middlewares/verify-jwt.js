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
    const tokenDecoded = verifyJWT(token);
    req.uid = tokenDecoded.uid;

    next();
  } catch (error) {
    console.log(error);
    return res.status(401).send({
      ok: false,
      message: 'Invalid token',
    });
  }
}

module.exports = {
  checkJWT,
};