import { postSchema, PostSchemaType } from "@/app/validationSchema";
import prisma from "@/prisma/client";
import { NextResponse } from "next/server";

export const POST = async (request: NextResponse) => {
  const body: PostSchemaType = await request.json();
  const { authorId, content, title } = body;

  const validation = postSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json("Invalid Input", { status: 400 });

  const newPost = await prisma.post.create({
    data: { content, title, authorId },
  });

  return NextResponse.json(newPost, { status: 201 });
};
