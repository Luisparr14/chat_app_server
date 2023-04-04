const { body } = require("express-validator")

const RegisterMiddlewares = [
  body("name", "Name is required").not().isEmpty(),
  body("email", "Email is required").isEmail(),
  body("password", "Password is required").not().isEmpty()
]

const LoginMiddlewares = [
  body("email", "Email is required").isEmail(),
  body("password", "Password is required").not().isEmpty()
]

module.exports = {
  RegisterMiddlewares,
  LoginMiddlewares
}
