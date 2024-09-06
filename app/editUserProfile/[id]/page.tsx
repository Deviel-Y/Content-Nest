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

  return (
    <div className="grid grid-cols-2 max-md:grid-cols-1 justify-stretch items-center">
      <div className="p-24 max-lg:p-12 max-md:hidden">
        <p className="font-bold text-[29px] max-lg:text-[25px] -mb-5 max-lg:-mb-3">
          Share your joy with the world at
        </p>
        <h1 className="font-extrabold text-[70px] max-lg:text-[50px]">
          CONTENT NEST
        </h1>
        <article className="font-semibold text-[16px] mt-3">
          At Content Nest, we believe in the power of joy and passion. Whether
          it&apos;s your favorite hobby, a memorable moment, or something that
          simply makes you smile, this is the place to share it with others.
          We&apos;re all about spreading positivity and connecting through the
          things that bring us happiness.
        </article>
      </div>

      <div className="mt-2">
        <EditUserProfileForm user={user!} />
      </div>
    </div>
  );
};

export default EditUserProfilePage;
