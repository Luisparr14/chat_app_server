const User = require('../../models/user.model');

const Register = async (req, res) => {

  await User.create(req.body);

  res.status(201).json({
    ok: true,
    msg: 'User created',
    user: req.body,
  });
};

module.exports = {
  Register,
};