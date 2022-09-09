const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 100,
  },
  director: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 100,
  },
  duration: {
    type: Number,
    required: true,
    minlength: 1,
    maxlength: 100,
  },
  year: {
    type: Number,
    required: true,
    minlength: 2,
    maxlength: 4,
  },
  description: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 100,
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        return /(?:https?):\/\/(\w+:?\w*)?(\S+)(:\d+)?(\/|\/([\w#!:.?+=&%!\-/]))?/.test(v);
      },
      message: (props) => `${props.value} is not a valid link!`,
    },
  },
  trailerLink: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        return /(?:https?):\/\/(\w+:?\w*)?(\S+)(:\d+)?(\/|\/([\w#!:.?+=&%!\-/]))?/.test(v);
      },
      message: (props) => `${props.value} is not a valid link!`,
    },
  },
  thumbnail: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        return /(?:https?):\/\/(\w+:?\w*)?(\S+)(:\d+)?(\/|\/([\w#!:.?+=&%!\-/]))?/.test(v);
      },
      message: (props) => `${props.value} is not a valid link!`,
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'user',
  },
  movieId: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 100,
  },
  nameRU: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 100,
  },
  nameEN: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 100,
  },
});

module.exports = mongoose.model('movie', cardSchema);
