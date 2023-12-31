import { DefaultSession, DefaultUser } from "next-auth";

interface IUser extends DefaultUser {
  jwtToken: string;
  userName: string;
}
declare module "next-auth" {
  interface User extends IUser {}
  interface Session {
    user?: User;
  }
}
declare module "next-auth/jwt" {
  interface JWT extends IUser {}
}

declare global {
  interface Window {
    MSStream: any;
  }
}
