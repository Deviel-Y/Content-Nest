import prisma from "@/prisma/client";
import EditUserProfileForm from "./EditUserInfoForm";

interface Props {
  params: { id: string };
}

const EditUserProfilePage = async ({ params: { id } }: Props) => {
  const user = await prisma.user.findUnique({ where: { id } });

  return <EditUserProfileForm user={user!} />;
};

export default EditUserProfilePage;
