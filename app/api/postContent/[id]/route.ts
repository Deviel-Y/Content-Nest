import { postSchema, PostSchemaType } from "@/app/validationSchema";
import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

interface Props {
  params: { id: string };
}

export const DELETE = async (
  request: NextRequest,
  { params: { id } }: Props
) => {
  const post = await prisma.post.findUnique({ where: { id } });
  if (!post) return NextResponse.json("Post not found", { status: 404 });

  const deletedPost = await prisma.post.delete({ where: { id } });
  return NextResponse.json(
    `Post with title of ${deletedPost.title} has been deleted`
  );
};

export const PATCH = async (
  request: NextRequest,
  { params: { id } }: Props
) => {
  try {
    const body: PostSchemaType = await request.json();
    const { content, genre, imageUrl, shortDescription, title } = body;

    const post = await prisma.post.findUnique({ where: { id } });
    if (!post)
      return NextResponse.json({ message: "Post not found" }, { status: 404 });

    const validation = postSchema.safeParse(body);
    if (!validation.success)
      return NextResponse.json(validation.error.format(), { status: 400 });

    const updatedPost = await prisma.post.update({
      where: { id },
      data: { content, genre, imageUrl, shortDescription, title },
    });

    return NextResponse.json(updatedPost, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
};
