export interface RequestRegistrationInterface {
  email: string;
  password: string;
  privacyPolicyConsent: boolean;
  recaptchaToken: string;
  userAgreementConsent: boolean;
}

export interface ResponseRegistrationInterface {
  message: string;
  result: {
    _id: string;
    email: string;
    password: string;
    privacyPolicyConsent: boolean;
    recaptchaToken: string;
    userAgreementConsent: boolean;
  }
}
