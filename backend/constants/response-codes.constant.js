module.exports = {
  // region Encryption
  DECRYPTION_ERROR_QUERY_PARAMS: {
    code: 600,
    message: 'There was an unexpected error'
  },
  DECRYPTION_ERROR_BODY: {
    code: 600,
    message: 'There was an unexpected error'
  },
  // endregion

  // region Recaptcha
  RECAPTCHA_INVALID: {
    code: 700,
    message: 'Invalid authentication'
  },
  RECAPTCHA_POST_ERROR: {
    code: 701,
    message: 'Invalid authentication'
  },
  // endregion

  // region Login
  LOGIN_SUCCESS: {
    code: 800,
    message: 'Login success'
  },
  LOGIN_NO_USER_ERROR: {
    code: 801,
    message: 'Invalid authentication credentials!'
  },
  LOGIN_INVALID_PASSWORD_ERROR: {
    code: 802,
    message: 'Invalid authentication credentials!'
  },
  LOGIN_INVALID_ERROR: {
    code: 803,
    message: 'Invalid authentication credentials!'
  },
  // endregion

  // region Registration
  REGISTRATION_SUCCESS: {
    code: 900,
    message: 'User created!'
  },
  REGISTRATION_ERROR: {
    code: 901,
    message: 'There was an error on account registration'
  },
  REGISTRATION_HASHING_ERROR: {
    code: 902,
    message: 'There was an error on account registration'
  },
  // endregion

  // region Account Delete
  ACCOUNT_DELETE_SUCCESS: {
    code: 1000,
    message: 'Account successfully deleted'
  },
  ACCOUNT_DELETE_ERROR: {
    code: 1001,
    message: 'There was an error on account deleting'
  },
  ACCOUNT_DELETE_NOTHING: {
    code: 1002,
    message: 'There was an error on account deleting'
  },
  // endregion

  // region Account Update
  ACCOUNT_UPDATE_SUCCESS: {
    code: 1100,
    message: 'Account successfully updated'
  },
  ACCOUNT_UPDATE_ERROR: {
    code: 1101,
    message: 'There was an error on account updating'
  },
  ACCOUNT_RETRIEVE_AFTER_UPDATE_ERROR: {
    code: 1102,
    message: 'There was an error on account updating'
  },
  ACCOUNT_UPDATE_NO_RESPONSE_ERROR: {
    code: 1103,
    message: 'There was an error on account updating'
  },
  ACCOUNT_UPDATE_INVALID_PASSWORD_SUCCESS: {
    code: 1104,
    message: 'Your password is incorrect'
  },
  ACCOUNT_UPDATE_NO_BODY_SUCCESS: {
    code: 1105,
    message: 'Your password is incorrect'
  },
  // endregion
};
