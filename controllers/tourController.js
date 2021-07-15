const Tour = require('./../models/tourModel');

exports.getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    requestedAt: req.requestTime,
    // results: tours.length,
    // data: {
    //   tours,
    // },
  });
};

exports.getTour = (req, res) => {
  const id = req.params.id * 1; // * 1 returns id as a number
  // const tour = tours.find((el) => el.id === id);

  // res.status(200).json({
  //   status: 'success',
  //   data: {
  //     tour,ß
  //   },
  // });
};

exports.createTour = (req, res) => {
  res.status(201).json({ status: 'success', data: { tour: newTour } });
};

exports.updateTour = (req, res) => {
  res.status(200).json({
    status: 'success',
    // data: {
    //   tour: '[Updated tour goes here]',
    // },
  });
};

exports.deleteTour = (req, res) => {
  res.status(204).json({
    status: 'success',
    data: null,
  });
};
