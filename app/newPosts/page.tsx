import prisma from "@/prisma/client";
import dynamic from "next/dynamic";
import { redirect } from "next/navigation";
import { auth } from "../auth";

const CreateNewPostPage = async () => {
  const PostForm = dynamic(() => import("@/app/components/PostForm"), {
    ssr: false,
  });

  const session = await auth();
  if (!session?.user) redirect("/api/auth/signin");

  const user = await prisma.user.findUnique({
    where: { email: session?.user?.email! },
  });

  return <PostForm authorId={user?.id!} />;
};

export default CreateNewPostPage;
