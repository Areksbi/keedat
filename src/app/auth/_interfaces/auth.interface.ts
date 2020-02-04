export interface RequestLoginInterface {
  email: string;
  password: string;
}

export interface RequestRegistrationInterface {
  email: string;
  password: string;
  privacyPolicyConsent: boolean;
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
