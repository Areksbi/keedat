import { RequestBaseInterface } from '../../_interfaces';

export interface RequestLoginInterface extends RequestBaseInterface {
  email: string;
  password: string;
}

export interface RequestRegistrationInterface extends RequestBaseInterface {
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
