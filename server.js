const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: './.env' });

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  /* NOTE Local Connection */
  // .connect(process.env.DATABASE_LOCAL, {

  /* Remote Connection */
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log(`Mongoose connected database`);
  });

const app = require('./app');

// Set port
const port = process.env.PORT || 8000;

// Start server
app.listen(port, () => {
  console.log(`Server listening on port ${port}!`);
});
