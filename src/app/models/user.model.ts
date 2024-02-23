import { Adress } from './adress.model';

export interface User {
  userId: number;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: number;
  role: string;
  isActive: boolean;
  adresses: Adress[];
}

export interface UserInfos {
  id: number;
  fullName: string;
  role: string;
  tokenLimitDate: Date
}
