const express = require('express');
const app = express();
const morgan = require('morgan');

// Import routes
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

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

// Routes
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

module.exports = app;
