const User = require('./../models/userModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find({});

  // SEND RESPONSE
  res.status(200).json({
    status: 'success',
    results: users.length,
    data: {
      users,
    },
  });
});

exports.getUser = (req, res) => {
  console.log('Route not yet implemented');
  res.status(500).json({
    status: 'error',
    message: '500 - Internal Server Error',
  });
};

exports.createUser = (req, res) => {
  console.log('Route not yet implemented');
  res.status(500).json({
    status: 'error',
    message: '500 - Internal Server Error',
  });
};

exports.updateUser = (req, res) => {
  console.log('Route not yet implemented');
  res.status(500).json({
    status: 'error',
    message: '500 - Internal Server Error',
  });
};

exports.deleteUser = (req, res) => {
  console.log('Route not yet implemented');
  res.status(500).json({
    status: 'error',
    message: '500 - Internal Server Error',
  });
};
