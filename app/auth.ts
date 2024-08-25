import prisma from "@/prisma/client";
import bcrypt from "bcrypt";
import NextAuth from "next-auth";
import Credential from "next-auth/providers/credentials";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";

const authJsConfig = {
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
      async authorize(credentials, request) {
        if (!credentials.email || !credentials.password) return null;

        const user = await prisma.user.findUnique({
          where: { email: credentials.email as string },
        });

        if (!user) return null;

        const isPasswordsMatch = await bcrypt.compare(
          credentials.password as string,
          user.hashedPassword
        );

        return isPasswordsMatch ? user : null;
      },
    }),
  ],
};

export const { handlers, auth } = NextAuth(authJsConfig);
