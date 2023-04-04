const { body } = require("express-validator")

const authMiddleware = [
  body("name", "Name is required").not().isEmpty(),
  body("email", "Email is required").isEmail(),
  body("password", "Password is required").not().isEmpty()
]

module.exports = {
  authMiddleware
}
