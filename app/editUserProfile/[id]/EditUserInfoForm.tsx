"use client";

import { Button, Card, Checkbox, Image, Input } from "@nextui-org/react";
import { useSession } from "next-auth/react";
import NextImage from "next/image";
import { useState } from "react";

const EditUserProfileForm = () => {
  const { data: session } = useSession();
  const [isPasswordFieldVisible, setPasswordFieldVisible] =
    useState<boolean>(false);
  const [isSelected, setIsSelected] = useState<boolean>(false);

  return (
    <div className="w-full flex justify-center items-center">
      <form className="w-2/3">
        <Card isBlurred className="flex flex-col p-5" shadow="lg">
          <div className="flex flex-row justify-between">
            <div>
              <h1 className="font-bold text-[25px]">Update Account</h1>

              <p className="text-[13px] mt-2 mb-5">
                Update your user profile info
              </p>
            </div>

            <Image
              radius="full"
              as={NextImage}
              width={90}
              height={90}
              alt="Profile Priture"
              src={session?.user?.image!}
              className="-translate-x-7 cursor-pointer hover:scale-105"
            />
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex flex-row gap-5">
              <Input label="First Name" variant="underlined" />

              <Input label="Last Name" variant="underlined" />
            </div>

            <Input
              type="email"
              label="Email Address"
              placeholder="example@domain.com"
              variant="underlined"
            />

            <div className="mt-10 flex flex-col gap-1 mb-3">
              <Checkbox size="sm" onValueChange={setIsSelected}>
                I&apos;d like to change my password
              </Checkbox>

              <Input
                disabled={!isSelected}
                type="Password"
                label="Current Password"
                variant="underlined"
              />

              <Input
                disabled={!isSelected}
                type="Password"
                label="New Password"
                variant="underlined"
              />

              <Input
                disabled={!isSelected}
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
