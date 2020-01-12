const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
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
  'privacy-policy-consent': {
    type: Boolean,
    required: true
  },
  'user-agreement-consent': {
    type: Boolean,
    required: true
  },
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);
