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
  if (!token) return { valid: false, uid: null };

  const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

  const { uid } = decodedToken;
  if (!uid) {
    return { valid: false, uid: null };
  }
  return { uid, valid: true}
};

module.exports = {
  generateJWT,
  verifyJWT,
};
