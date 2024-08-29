import { redirect } from "next/navigation";
import { auth } from "../auth";

const CreateNewPostPage = async () => {
  const session = await auth();
  if (!session?.user) redirect("/api/auth/signin");

  return <div>CreateNewPostPage</div>;
};

export default CreateNewPostPage;
