import { auth } from "@/app/auth";
import { signUpUserSchema, SignUpUserSchemaType } from "@/app/validationSchema";
import prisma from "@/prisma/client";
import { User } from "@prisma/client";
import bcrypt from "bcrypt";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
  const session = await auth();
  if (!session)
    return NextResponse.json("You're not authorized yet", { status: 401 });

  const user: User[] = await prisma.user.findMany();

  if (user.length === 0)
    return NextResponse.json("No User Found", { status: 404 });

  return NextResponse.json(user);
};

export const POST = async (request: NextRequest) => {
  const session = await auth();
  if (!session)
    return NextResponse.json("You're not authorized yet", { status: 401 });

  try {
    const body: SignUpUserSchemaType = await request.json();
    const { email, password, confirmPassword } = body;

    const validation = signUpUserSchema.safeParse(body);
    if (!validation.success)
      return NextResponse.json(validation.error.format(), {
        status: 400,
      });

    if (password !== confirmPassword)
      return NextResponse.json("Passwords don't match each other", {
        status: 400,
      });

    const user = await prisma.user.findUnique({ where: { email } });
    if (user)
      return NextResponse.json("User with this email is already exists", {
        status: 400,
      });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: { email, hashedPassword },
    });

    return NextResponse.json(newUser);
  } catch (error) {
    return NextResponse.json(error);
  }
};
