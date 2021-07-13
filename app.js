const express = require('express');
const app = express();

// Set port
const port = process.env.PORT || 3000;

// Routing
app.get('/', (req, res) => {
  res.status(200).send('Hello from the Server!');
});

// Start server
app.listen(port, () => {
  console.log(`Server listening on port ${port}!`);
});
