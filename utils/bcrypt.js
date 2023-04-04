const { hashSync, genSalt, genSaltSync } = require('bcryptjs');

const genSaltUtil = (rounds) => genSaltSync(rounds);

const encryptPassword = (password) => {
  const salt = genSaltUtil(10);
  return hashSync(password, salt);
}

module.exports = {
  genSaltUtil,
  encryptPassword
}