import { redirect } from "next/navigation";
import { auth } from "../auth";
import PostForm from "../components/PostForm";

const CreateNewPostPage = async () => {
  const session = await auth();
  if (!session?.user) redirect("/api/auth/signin");

  return <PostForm />;
};

export default CreateNewPostPage;
