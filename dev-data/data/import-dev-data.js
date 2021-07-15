const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: './.env' });

const Tour = require('./../../models/tourModel');

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log(`Mongoose connected database`);
  });

// read json file
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf8')
);

// import data to mongo
const importData = async () => {
  try {
    await Tour.create(tours);
    console.log('Data imported!');
    process.exit();
  } catch (err) {
    console.log(err);
  }
};

// delete data from mongo
const deleteData = async () => {
  try {
    await Tour.deleteMany();
    console.log('Data deleted!');
    process.exit();
  } catch (err) {
    console.log(err);
  }
};

if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
} else {
  console.log('Wrong argument!');
}

console.log(process.argv);
