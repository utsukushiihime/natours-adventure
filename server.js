const dotenv = require('dotenv');
dotenv.config({ path: './.env' });

const app = require('./app');

// console.log(process.env);

// Set port
const port = process.env.PORT || 8000;

// Start server
app.listen(port, () => {
  console.log(`Server listening on port ${port}!`);
});
