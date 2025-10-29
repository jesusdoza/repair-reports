export interface AuthUser {
  userId: string; // auth provider userid
  email: string;
  emailVerified: boolean;
  provider: string;
  name?: string | undefined;
  username?: string | undefined;
}

export interface AuthProvider {
  name: string;
  verifyToken(token: string): Promise<AuthUser>;
  getUser(uid: string): Promise<AuthUser | null>;
}
