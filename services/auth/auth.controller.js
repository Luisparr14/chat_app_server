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

const Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).send({
        ok: false,
        message: 'Credentials are incorrect',
      });
    }

    const validPassword = user.validatePassword(password);

    if (!validPassword) {
      return res.status(400).send({
        ok: false,
        message: 'Credentials are incorrect',
      });
    }

    const token = await generateJWT(user.id)

    res.status(200).send({
      ok: true,
      message: 'User authenticated successfully',
      user,
      token
    });
  } catch (error) {
    res.status(500).send({
      ok: false,
      message: 'Error authenticating user',
      error,
    });
  }
};

const RenewToken = async (req, res) => {
  try {
    const { uid } = req;
    const token = await generateJWT(uid);
    const user = await User.findById(uid);

    res.status(200).send({
      ok: true,
      user,
      token
    });
  } catch (error) {
    res.status(500).send({
      ok: false,
      message: 'Error renewing token',
      error,
    });
  }
};

module.exports = {
  Register,
  Login,
  RenewToken,
};