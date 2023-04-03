const Login = async (_, res) => {
  res.json({
    ok: true,
    msg: 'Login',
  });
};

module.exports = {
  Login,
};