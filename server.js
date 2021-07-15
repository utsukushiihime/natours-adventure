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

// create mongoose schema
const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Tour name is required'],
    unique: true,
  },
  rating: { type: Number, default: 4.5 },
  price: { type: Number, required: [true, 'Price is required'] },
});

const Tour = mongoose.model('Tour', tourSchema);

const app = require('./app');

// Set port
const port = process.env.PORT || 8000;

// Start server
app.listen(port, () => {
  console.log(`Server listening on port ${port}!`);
});
