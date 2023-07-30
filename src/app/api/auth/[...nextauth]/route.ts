import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",

      credentials: {
        userName: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials, req) {
        const { userName, password } = credentials as any;

        const res = await fetch(`${process.env.NEXT_API_URL}login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userName,
            password,
          }),
        });

        const user = await res.json();
        if (user.status === 200) return user.data;
        else {
          return null;
        }
      },
    }),
  ],

  session: {
    strategy: "jwt",
    maxAge: 259200,
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    jwt: async ({ token, user }) => {
      return { ...token, ...user };
    },

    session: async ({ session, token }) => {
      session.user = token;
      return session;
    },
  },

  pages: {
    signIn: "/login",
    error: "/login",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
