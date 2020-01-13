export interface RequestLoginInterface {
  email: string;
  password: string;
  recaptchaToken: string;
}

export interface RequestRegistrationInterface {
  email: string;
  password: string;
  privacyPolicyConsent: boolean;
  recaptchaToken: string;
}

export interface ResponseLoginInterface {
  expiresIn: number;
  token: string;
  userId: string;
}

export interface ResponseRegistrationInterface {
  message: string;
  result: {
    _id: string;
    email: string;
    password: string;
    privacyPolicyConsent: boolean;
    recaptchaToken: string;
  }
}
