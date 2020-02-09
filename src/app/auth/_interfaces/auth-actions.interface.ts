import { RequestLoginInterface } from './auth.interface';

export interface RequestLoginActionInterface extends RequestLoginInterface {
  returnUrl: string;
}
