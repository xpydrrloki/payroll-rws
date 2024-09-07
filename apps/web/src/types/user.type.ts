export enum Role {
    SUPERADMIN = 'SUPERADMIN',
    PERSONALIA = 'PERSONALIA',
    ADMIN = 'ADMIN',
  }
  
  export interface User {
    id: number;
    name: string;
    username: string;
    password: string;
    role: Role;
  }