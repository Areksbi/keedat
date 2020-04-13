import { ResponseBaseInterface } from '../../../_interfaces/base.interface';

export interface RequestUpdateAccount {
  email?: string;
  password?: string;
  newPassword?: string;
}

export interface ResponseUpdateAccount extends ResponseBaseInterface {
  result: {
    email: string;
  }
}
