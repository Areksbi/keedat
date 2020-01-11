const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  privacyPolicyConsent: {
    type: Boolean,
    required: true
  },
  recaptchaToken: {
    type: String,
    required: true
  },
  userAgreementConsent: {
    type: Boolean,
    required: true
  }
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);
