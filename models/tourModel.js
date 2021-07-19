const mongoose = require('mongoose');
const slugify = require('slugify');

const tourSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Tour name is required'],
      unique: true,
      trim: true,
    },
    maxGroupSize: {
      type: Number,
      required: [true, 'Max group size is required'],
    },
    difficulty: {
      type: String,
      required: [true, 'Difficulty is required'],
    },
    duration: { type: Number, required: [true, 'Duration is required'] },
    ratingsAverage: { type: Number, default: 4.5 },
    ratingsQuantity: { type: Number, default: 0 },
    price: { type: Number, required: [true, 'Price is required'] },
    priceDiscount: { type: Number },
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
tourSchema.pre('find', function (next) {
  this.find({ secretTour: { $ne: true } });
  next();
});

const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
