const User = require('../../models/user.model');
const { encryptPassword } = require('../../utils/bcrypt');

const Register = async (req, res) => {
  try {

    const { name, email, password } = req.body;

    const emailExists = await User.findOne({ email });

    if (emailExists) {
      return res.status(400).send({
        ok: false,
        message: 'An error occurred while creating the user',
      });
    }

    const user = new User({
      name,
      email,
      password: encryptPassword(password),
    });

    await user.save();

    res.status(201).send({
      ok: true,
      message: 'User created successfully',
      user,
    });
  } catch (error) {
    res.status(500).send({
      ok: false,
      message: 'Error creating user',
      error,
    });
  }
};

module.exports = {
  Register,
};