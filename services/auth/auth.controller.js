const User = require('../../models/user.model');

const Register = async (req, res) => {
  try {

    const { email } = req.body;

    const emailExists = User.findOne({ email });

    if (emailExists) {
      return res.status(400).send({
        ok: false,
        message: 'An error occurred while creating the user',
      });
    }

    const user = new User(req.body);
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