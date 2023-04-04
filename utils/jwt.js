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

module.exports = {
  generateJWT,
};
