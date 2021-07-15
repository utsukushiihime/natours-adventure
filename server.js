const app = require('./app');

// Set port
const port = process.env.PORT || 3000;

// Start server
app.listen(port, () => {
  console.log(`Server listening on port ${port}!`);
});
