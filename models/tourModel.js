const mongoose = require('mongoose');
const slugify = require('slugify');

const tourSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Tour name is required'],
      unique: true,
      trim: true,
      maxlength: [40, 'Tour name is too long, must not exceed 40 characters'],
      minlength: [
        10,
        'Tour name is too short, must not be less than 10 characters',
      ],
    },
    maxGroupSize: {
      type: Number,
      required: [true, 'Max group size is required'],
    },
    difficulty: {
      type: String,
      required: [true, 'Difficulty is required'],
      enum: {
        values: ['easy', 'medium', 'difficult'],
        message: 'Difficulty must be one of easy, medium, or difficult',
      },
    },
    duration: { type: Number, required: [true, 'Duration is required'] },
    ratingsAverage: {
      type: Number,
      default: 4.5,
      min: [1, 'Ratings must be above 1.0'],
      max: [5, 'Ratings must be below 5.0'],
    },
    ratingsQuantity: { type: Number, default: 0 },
    price: { type: Number, required: [true, 'Price is required'] },
    priceDiscount: {
      type: Number,
      validate: {
        validator: function (value) {
          return value < this.price; // this only works on NEW document creation, not on update
        },
        message: 'Price ({VALUE}) must be less than the original price',
      },
    },
    summary: {
      type: String,
      trim: true,
      required: [true, 'Summary is required'],
    },
    description: { type: String, trim: true },
    imageCover: { type: String, required: [true, 'Image cover is required'] },
    images: [String],
    createdAt: { type: Date, default: Date.now(), select: false },
    startDates: [Date],
    secretTour: { type: Boolean, default: false },
    slug: String,
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

tourSchema.virtual('durationWeeks').get(function () {
  return this.duration / 7;
});

// DOCUMENT MIDDLEWARE: runs before .save() and .create()
// will not work when updating
tourSchema.pre('save', function (next) {
  if (this.isNew) {
    this.slug = slugify(this.name, { lower: true });
  }
  next();
});

// QUERY MIDDLEWARE: runs before .find()
tourSchema.pre(/^find/, function (next) {
  this.find({ secretTour: { $ne: true } });

  this.start = Date.now();
  next();
});

tourSchema.post(/^find/, function (docs, next) {
  console.log(`Query took ${Date.now() - this.start} milliseconds`);
  next();
});

// AGGREGATION MIDDLEWARE
tourSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { secretTour: { $ne: true } } });
  // console.log(this.pipeline());
  next();
});

const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
