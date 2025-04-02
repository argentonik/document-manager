import { UserRole } from './user-role.enum';

export interface SignUpReq {
  email: string;
  password: string;
  fullName: string;
  role: UserRole;
}
