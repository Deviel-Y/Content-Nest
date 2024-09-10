import { auth } from "@/app/auth";
import { postSchema, PostSchemaType } from "@/app/validationSchema";
import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  const session = await auth();
  if (!session)
    return NextResponse.json("You're not authorized yet", { status: 401 });

  try {
    const body: PostSchemaType = await request.json();
    const { content, title, genre, imageUrl, shortDescription } = body;

    const validation = postSchema.safeParse(body);
    if (!validation.success)
      return NextResponse.json("Invalid Input", { status: 400 });

    const newPost = await prisma.post.create({
      data: {
        content,
        title,
        genre,
        imageUrl,
        shortDescription,
        authorId: session.user?.id!,
      },
    });

    return NextResponse.json(newPost, { status: 201 });
  } catch (error) {
    return NextResponse.json(error);
  }
};
