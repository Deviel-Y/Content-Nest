import { signUpUserSchema, SignUpUserSchemaType } from "@/app/validationSchema";
import prisma from "@/prisma/client";
import bcrypt from "bcrypt";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  try {
    const body: SignUpUserSchemaType = await request.json();
    const { email, password } = body;

    const validation = signUpUserSchema.safeParse(body);
    if (!validation.success)
      return NextResponse.json("invalida Input", { status: 400 });

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
    console.log(error);
  }
};
