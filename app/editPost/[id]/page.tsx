import { auth } from "@/app/auth";
import prisma from "@/prisma/client";
import dynamic from "next/dynamic";
import { redirect } from "next/navigation";

interface Props {
  params: { id: string };
}

const EditPostPage = async ({ params: { id } }: Props) => {
  const PostForm = dynamic(() => import("@/app/components/PostForm"), {
    ssr: false,
  });

  const currentPost = await prisma.post.findUnique({ where: { id } });

  const session = await auth();
  if (!session?.user) redirect("/api/auth/signin");

  const user = await prisma.user.findUnique({
    where: { email: session?.user?.email! },
  });

  return <PostForm authorId={user?.id!} post={currentPost!} />;
};

export default EditPostPage;
