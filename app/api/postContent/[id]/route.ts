import { postSchema, PostSchemaType } from "@/app/validationSchema";
import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

interface Props {
  params: { id: string };
}

export const PATCH = async (
  request: NextRequest,
  { params: { id } }: Props
) => {
  try {
    // Parse the body
    const body: PostSchemaType = await request.json();
    const { content, genre, imageUrl, shortDescription, title } = body;

    // Check if the post exists
    const post = await prisma.post.findUnique({ where: { id } });
    if (!post)
      return NextResponse.json({ message: "Post not found" }, { status: 404 });

    // Validate the incoming data
    const validation = postSchema.safeParse(body);
    if (!validation.success)
      return NextResponse.json(validation.error.format(), { status: 400 });

    // Update the post
    const updatedPost = await prisma.post.update({
      where: { id },
      data: { content, genre, imageUrl, shortDescription, title },
    });

    // Return the updated post or a success message
    return NextResponse.json(updatedPost, { status: 200 });
  } catch (error) {
    // Handle errors more gracefully
    console.error("Error updating post:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
};
