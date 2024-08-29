"use client";

import ProfilePictureButton from "@/app/components/ProfilePictureButton";
import { EditUserInfoSchemaType } from "@/app/validationSchema";
import { Button, Card, Checkbox, Input } from "@nextui-org/react";
import { User } from "@prisma/client";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { useForm } from "react-hook-form";

interface Props {
  user: User;
}

const EditUserProfileForm = ({ user }: Props) => {
  const { data: session, update } = useSession();

  const [isPasswordFieldsActive, setIsPasswordFieldsActive] =
    useState<boolean>(false);
  const [profileImageUrl, setProfileImageUrl] = useState<string>(
    session?.user?.image as string
  );

  const { register, handleSubmit } = useForm<EditUserInfoSchemaType>();

  return (
    <div className="w-full mt-10 flex justify-center items-center">
      <form
        className="w-2/3 max-sm:w-full"
        onSubmit={handleSubmit(
          async ({
            firstName,
            lastName,
            oldPassword,
            newPassword,
            email,
            confirmPassword,
          }) => {
            await axios
              .patch(`/api/user/${user.id}`, {
                firstName,
                lastName,
                email,
                oldPassword,
                newPassword,
                confirmPassword,
                imageUrl: profileImageUrl,
                isPasswordFieldActive: isPasswordFieldsActive,
              })
              .then(() =>
                update({
                  ...session?.user,
                  name: `${firstName} ${lastName}`,
                  email,
                })
              );
          }
        )}
      >
        <Card isBlurred className="flex flex-col p-5" shadow="lg">
          <div className="flex flex-row justify-between items-center">
            <div>
              <h1 className="font-bold text-[25px]">Update Account</h1>

              <p className="text-[13px] mt-2 mb-5">
                Update your user profile info
              </p>
            </div>

            <ProfilePictureButton
              updateProfile={(imageUrl) => setProfileImageUrl(imageUrl)}
            />
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex flex-row gap-5 max-sm:flex-col">
              <Input
                {...register("firstName")}
                label="First Name"
                defaultValue={user?.name?.split(" ")[0]}
                variant="underlined"
              />

              <Input
                {...register("lastName")}
                label="Last Name"
                defaultValue={user?.name?.split(" ")[1]}
                variant="underlined"
              />
            </div>

            <Input
              {...register("email")}
              defaultValue={user?.email}
              type="email"
              label="Email Address"
              placeholder="example@domain.com"
              variant="underlined"
            />

            <div className="mt-10 flex flex-col gap-1 mb-3">
              <Checkbox size="sm" onValueChange={setIsPasswordFieldsActive}>
                I&apos;d like to change my password
              </Checkbox>

              <Input
                {...register("oldPassword")}
                disabled={!isPasswordFieldsActive}
                type="Password"
                label="Current Password"
                variant="underlined"
              />

              <Input
                {...register("newPassword")}
                disabled={!isPasswordFieldsActive}
                type="Password"
                label="New Password"
                variant="underlined"
              />

              <Input
                {...register("confirmPassword")}
                disabled={!isPasswordFieldsActive}
                type="Password"
                label="Confirm Password"
                variant="underlined"
              />
            </div>

            <div className="flex flex-row gap-5 ">
              <Button type="submit" variant="solid" color="primary">
                Save Changes
              </Button>

              <Button type="button" variant="ghost" color="danger">
                Cancel
              </Button>
            </div>
          </div>
        </Card>
      </form>
    </div>
  );
};

export default EditUserProfileForm;
