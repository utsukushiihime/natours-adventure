const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  // name, email, photo, password, password confirm
  name: { type: String, required: [true, 'Name is required'] },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: [true, 'This email is already registered'],
    lowercase: true,
    validate: [
      validator.isEmail,
      'Email is not valid, please provide a valid email',
    ],
  },
  photo: {
    type: String,
    default: 'https://joeschmoe.io/api/v1/random',
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [8, 'Password must be at least 8 characters'],
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [8, 'Password must be at least 8 characters'],
    validate: {
      // This only works on CREATE and SAVE, not on UPDATE
      validator: function (el) {
        return el === this.password;
      },
      message: 'Passwords do not match',
    },
  },
});

userSchema.pre('save', async function (next) {
  // only hash the password if it has been modified (or is new)
  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined; // to prevent double hashing
  next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;
