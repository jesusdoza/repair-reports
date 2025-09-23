export interface AuthUser {
  user_id: string; // auth provider userid
  email: string;
  email_verified: boolean;
  provider: string;
  name?: string | undefined;
  username?: string | undefined;
}
