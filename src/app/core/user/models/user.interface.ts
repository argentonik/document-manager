import { UserRole } from './user-role.enum';

export interface User {
  id: string;
  email: string;
  fullName: string;
  role: UserRole;
}
