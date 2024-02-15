export interface Login {
  email: string;
  password: string;
}

export interface Register {
  firstName: string;
  lastName: string;
  phoneNumber: number;
  email: string;
  password: string;
  
}

export interface Token {
  token: string;
}
