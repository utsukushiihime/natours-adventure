const fs = require('fs');
const express = require('express');
const app = express();

// Set port
const port = process.env.PORT || 3000;

// Get data
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`, 'utf8')
);

// Routing
app.get('/api/v1/tours', (req, res) => {
  res.status(200).json({
    status: 'success',
    data: {
      tours,
    },
  });
});

// Start server
app.listen(port, () => {
  console.log(`Server listening on port ${port}!`);
});
