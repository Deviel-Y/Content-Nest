import prisma from "@/prisma/client";
import { redirect } from "next/navigation";
import { auth } from "../auth";
import PostForm from "../components/PostForm";

const CreateNewPostPage = async () => {
  const session = await auth();
  if (!session?.user) redirect("/api/auth/signin");

  const user = await prisma.user.findUnique({
    where: { email: session?.user?.email! },
  });

  return <PostForm authorId={user?.id!} />;
};

export default CreateNewPostPage;
