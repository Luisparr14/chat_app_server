const { hashSync, genSaltSync, compareSync } = require('bcryptjs');

const genSaltUtil = (rounds) => genSaltSync(rounds);

const encryptPassword = (password) => {
  const salt = genSaltUtil(10);
  return hashSync(password, salt);
}

const comparePassword = (password, hash) => {
  return compareSync(password, hash);
}

module.exports = {
  genSaltUtil,
  encryptPassword,
  comparePassword
}