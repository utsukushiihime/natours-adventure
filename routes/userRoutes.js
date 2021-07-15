const express = require('express');

const router = express.Router();

const getAllUsers = (req, res) => {
  console.log('Route not yet implemented');
  res.status(500).json({
    status: 'error',
    message: '500 - Internal Server Error',
  });
};

const getUser = (req, res) => {
  console.log('Route not yet implemented');
  res.status(500).json({
    status: 'error',
    message: '500 - Internal Server Error',
  });
};

const createUser = (req, res) => {
  console.log('Route not yet implemented');
  res.status(500).json({
    status: 'error',
    message: '500 - Internal Server Error',
  });
};

const updateUser = (req, res) => {
  console.log('Route not yet implemented');
  res.status(500).json({
    status: 'error',
    message: '500 - Internal Server Error',
  });
};

const deleteUser = (req, res) => {
  console.log('Route not yet implemented');
  res.status(500).json({
    status: 'error',
    message: '500 - Internal Server Error',
  });
};

router.route('/').get(getAllUsers).post(createUser);
router.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);

module.exports = router;
