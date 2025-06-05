export interface UserSession {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  roles: string[]; // Les rôles stockés dans Redis
}
