import { postSchema, PostSchemaType } from "@/app/validationSchema";
import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  const body: PostSchemaType = await request.json();
  const { authorId, content, title, genre, imageUrl, shortDescription } = body;

  const validation = postSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json("Invalid Input", { status: 400 });

  const newPost = await prisma.post.create({
    data: { content, title, authorId, genre, imageUrl, shortDescription },
  });

  return NextResponse.json(newPost, { status: 201 });
};
