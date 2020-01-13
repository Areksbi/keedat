const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
  'consent-privacy-policy': {
    type: Boolean,
    required: true
  },
  'date-creation': {
    type: Date,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);
