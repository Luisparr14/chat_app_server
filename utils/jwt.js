const jwt = require('jsonwebtoken');

const generateJWT = async (uid) => {
  const payload = { uid };
  const token = await jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: '12h',
  });
  return token;
};

module.exports = {
  generateJWT,
};
