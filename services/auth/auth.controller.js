const User = require('../../models/user.model');
const { encryptPassword } = require('../../utils/bcrypt');
const { generateJWT } = require('../../utils/jwt');

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

    const token = await generateJWT(user.id)
    
    await user.save();
    res.status(201).send({
      ok: true,
      message: 'User created successfully',
      user,
      token
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