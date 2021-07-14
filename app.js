const fs = require('fs');
const express = require('express');
const app = express();
const morgan = require('morgan');

// Set port
const port = process.env.PORT || 3000;

// Middleware
app.use(morgan('dev'));
app.use(express.json());
app.use((req, res, next) => {
  console.log('Hello from middleware! 👋');
  next();
});
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// Get data
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`, 'utf8')
);

// Route Handlers
const getAllTours = (req, res) => {
  console.log(req.requestTime);

  res.status(200).json({
    status: 'success',
    requestedAt: req.requestTime,
    results: tours.length,
    data: {
      tours,
    },
  });
};

const getTour = (req, res) => {
  console.log(req.params);

  const id = req.params.id * 1; // * 1 returns id as a number
  const tour = tours.find((el) => el.id === id);

  if (!tour) {
    return res.status(404).json({
      status: 'fail',
      message: '404 - Invalid ID',
    });
  }

  res.status(200).json({
    status: 'success',
    data: {
      tour,
    },
  });
};

const createTour = (req, res) => {
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);

  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({ status: 'success', data: { tour: newTour } });
    }
  );
};

const updateTour = (req, res) => {
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: '404 - Invalid ID',
    });
  }
  res.status(200).json({
    status: 'success',
    data: {
      tour: '[Updated tour goes here]',
    },
  });
};

const deleteTour = (req, res) => {
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: '404 - Invalid ID',
    });
  }
  res.status(204).json({
    status: 'success',
    data: null,
  });
};

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

// Routes
const tourRouter = express.Router();
const userRouter = express.Router();

tourRouter.route('/').get(getAllTours).post(createTour);
tourRouter.route('/:id').get(getTour).patch(updateTour).delete(deleteTour);

userRouter.route('/').get(getAllUsers).post(createUser);
userRouter.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

// Start server
app.listen(port, () => {
  console.log(`Server listening on port ${port}!`);
});
