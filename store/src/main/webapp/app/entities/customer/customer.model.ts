import { IUser } from 'app/entities/user/user.model';
import { Gender } from 'app/entities/enumerations/gender.model';

export interface ICustomer {
  id?: number;
  firstName?: string;
  lastName?: string;
  gender?: Gender;
  email?: string;
  phone?: string;
  addressLine1?: string;
  addressLine2?: string | null;
  city?: string;
  country?: string;
  user?: IUser;
}

export class Customer implements ICustomer {
  constructor(
    public id?: number,
    public firstName?: string,
    public lastName?: string,
    public gender?: Gender,
    public email?: string,
    public phone?: string,
    public addressLine1?: string,
    public addressLine2?: string | null,
    public city?: string,
    public country?: string,
    public user?: IUser
  ) {}
}

export function getCustomerIdentifier(customer: ICustomer): number | undefined {
  return customer.id;
}
