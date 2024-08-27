import {
  editUserInfoSchema,
  EditUserInfoSchemaType,
} from "@/app/validationSchema";
import prisma from "@/prisma/client";
import bcrypt from "bcrypt";
import { NextRequest, NextResponse } from "next/server";

interface Props {
  params: { id: string };
}

export const PATCH = async (
  request: NextRequest,
  { params: { id } }: Props
) => {
  const body: EditUserInfoSchemaType = await request.json();
  const {
    firstName,
    lastName,
    email,
    imageUrl,
    isPasswordFieldActive,
    newPassword,
    oldPassword,
    confirmPassword,
  } = body;

  const user = await prisma.user.findUnique({ where: { id } });
  if (!user) return NextResponse.json("User Not Found", { status: 404 });

  const validation = editUserInfoSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 });

  if (isPasswordFieldActive) {
    const isOldPasswordMatch = await bcrypt.compare(
      oldPassword!,
      user.hashedPassword
    );
    if (!isOldPasswordMatch)
      return NextResponse.json("Old password is not correct", { status: 400 });

    if (newPassword !== confirmPassword)
      return NextResponse.json("Password don't match", { status: 400 });

    var newHashedPassword = await bcrypt.hash(confirmPassword!, 10);
  }

  const name: string = `${firstName || ""} ${lastName || ""}`;

  const updatedUser = await prisma.user.update({
    where: { id },
    data: {
      name,
      email,
      imageUrl,
      hashedPassword: newHashedPassword!,
    },
  });

  return NextResponse.json(
    `User Profile ${updatedUser.email} Has Been Updated`
  );
};
