const jwt = require('jsonwebtoken');

const generateJWT = async (uid) => {
  const payload = { uid };
  return new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      {
        expiresIn: '4h',
      },
      (err, token) => {
        if (err) {
          console.log(err);
          reject('Error generating token');
        }
        resolve(token);
      }
    );
  });
};

const verifyJWT = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};

module.exports = {
  generateJWT,
  verifyJWT,
};
