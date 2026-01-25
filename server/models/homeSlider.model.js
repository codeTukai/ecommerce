// import mongoose from 'mongoose';

// const homeSliderSchema = new mongoose.Schema({
//   images: {
//     type: [String],
//     required: true,
//     validate: [arr => arr.length > 0, 'At least one image is required.'],
//   },
//   bannerTitleName: {
//     type: String,
//     required: true, // 👈 This line is important
//     trim: true,
//   },
//   dateCreated: {
//     type: Date,
//     default: Date.now,
//   },
// }, {
//   timestamps: true,
// });

// const HomeSliderModel = mongoose.model('HomeSlider', homeSliderSchema);

// export default HomeSliderModel;

import mongoose from 'mongoose';

const homeSliderSchema = new mongoose.Schema({
  images: {
    type: [String],
    required: [true, 'At least one image is required.'],
    validate: [arr => arr.length > 0, 'At least one image is required.'],
  },
  bannerTitleName: {
    type: String,
    required: [true, 'bannerTitleName is required.'], // custom message
    trim: true,
  },
  dateCreated: {
    type: Date,
    default: Date.now,
  },
}, {
  timestamps: true,
});

const HomeSliderModel = mongoose.model('HomeSlider', homeSliderSchema);
export default HomeSliderModel;
