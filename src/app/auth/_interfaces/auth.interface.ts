export interface AuthInterface {
  email: string;
  password: string;
  privacyPolicyConsent: boolean;
  recaptchaToken: string;
  userAgreementConsent: boolean;
}
