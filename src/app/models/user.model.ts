import { Adress } from './adress.model';

export interface User {
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: number;
  role: string;
  userId: number;
  adresses: Adress[];
}

export interface UserInfos {
  id: number;
  fullName: string;
  role: string;
}
