import { auth } from "@/app/auth";
import prisma from "@/prisma/client";
import { redirect } from "next/navigation";
import EditUserProfileForm from "./EditUserInfoForm";

interface Props {
  params: { id: string };
}

const EditUserProfilePage = async ({ params: { id } }: Props) => {
  const session = await auth();
  const user = await prisma.user.findUnique({ where: { id } });

  if (session?.user?.id !== user?.id) redirect("/");

  return <EditUserProfileForm user={user!} />;
};

export default EditUserProfilePage;
