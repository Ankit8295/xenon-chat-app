import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",

      credentials: {
        username: { label: "Username", type: "text" },
        userId: { label: "userId", type: "email" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials, req) {
        const { userId, password, username } = credentials as any;

        const res = await fetch(`http://localhost:3000/api/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: userId,
            username: username,
            password: password,
          }),
        });

        const user = await res.json();
        console.log("result" + user);
        if (user.status === 200) return user.data;
        else {
          return null;
        }
      },
    }),
  ],

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
    signIn: "/",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
