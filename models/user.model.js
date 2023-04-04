const { Schema, model } = require('mongoose');
const { comparePassword } = require('../utils/bcrypt');

const UserSchema = Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  online: {
    type: Boolean,
    default: false
  }
});

UserSchema.method('toJSON', function() {
  const { __v, _id, password, ...object } = this.toObject();
  object.uid = _id;
  return object;
});

UserSchema.method('validatePassword', function(password) {
  return comparePassword(password, this.password);
});


module.exports = model('User', UserSchema);