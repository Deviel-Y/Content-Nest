import prisma from "@/prisma/client";
import { PrismaAdapter } from "@auth/prisma-adapter";
import bcrypt from "bcrypt";
import NextAuth from "next-auth";
import Credential from "next-auth/providers/credentials";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";

export const { handlers, auth, signIn, signOut } = NextAuth({
  pages: {
    signIn: "/userLogin",
  },

  adapter: PrismaAdapter(prisma),

  session: { strategy: "jwt" },

  providers: [
    Google,
    GitHub,
    Credential({
      name: "Credentials",
      credentials: {
        email: {
          name: "email",
          label: "Email",
          type: "email",
          placeholder: "example@domail.com",
        },
        password: {
          name: "password",
          label: "Password",
          type: "password",
          placeholder: "Account Password",
        },
      },
      async authorize(credentials) {
        if (!credentials.email || !credentials.password) return null;

        const user = await prisma.user.findUnique({
          where: { email: credentials.email as string },
        });

        if (!user) return null;

        const isPasswordsMatch = await bcrypt.compare(
          credentials.password as string,
          user.hashedPassword!
        );

        return isPasswordsMatch ? user : null;
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user, session, account, trigger }) {
      if (trigger === "update") {
        token.name = session.name;
        token.email = session.email;
        token.picture = session.image;
      }

      if (user) {
        return {
          ...token,
          id: user.id,
          provider: account?.provider,
          name: token.name,
          email: token.email,
          image: token.picture,
        };
      }

      return token;
    },

    async session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.sub,
          provider: token.provider,
        },
      };
    },
  },
});
