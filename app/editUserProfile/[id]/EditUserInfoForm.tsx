"use client";

import UploadPictureButton from "@/app/components/UploadPictureButton";
import { EditUserInfoSchemaType } from "@/app/validationSchema";
import { Button, Card, Checkbox, Input } from "@nextui-org/react";
import { User } from "@prisma/client";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";

interface Props {
  user: User;
}

interface InputFields {
  firstName?: string;
  lastName?: string;
  email?: string;
  newPassword?: string;
  confirmPassword?: string;
}

const EditUserProfileForm = ({ user }: Props) => {
  const router = useRouter();
  const { data: session, update } = useSession();

  const [isPasswordFieldsActive, setIsPasswordFieldsActive] =
    useState<boolean>(false);

  const [inputFieldValues, setFieldValues] = useState<InputFields>({
    firstName: user?.name?.split(" ")[0],
    lastName: user?.name?.split(" ")[1],
    email: user.email!,
  });

  const {
    register,
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = useForm<EditUserInfoSchemaType>();

  const onSubmit = handleSubmit((data) => {
    const requestPromise = axios
      .patch(`/api/user/${user.id}`, data)
      .then(() => {
        update({
          ...session?.user,
          name: `${data.firstName} ${data.lastName}`,
          email: data.email,
        });
        router.push("/");
      });

    toast.promise(requestPromise, {
      error: "One or more input fields are invalid",
      loading: "Updating...",
      success: "Profile Updated",
    });
  });

  return (
    <div className="w-full flex justify-center items-center">
      <form className="w-2/3 max-sm:w-full" onSubmit={onSubmit}>
        <Card isBlurred className="flex flex-col p-5" shadow="lg">
          <div className="flex flex-row justify-between items-center">
            <div>
              <h1 className="font-bold text-[25px]">Update Account</h1>

              <p className="text-[13px] mt-2 mb-5">
                Update your user profile info
              </p>
            </div>

            <Controller
              name="image"
              control={control}
              render={({ field: { onChange } }) => (
                <UploadPictureButton
                  updateProfile={(imageUrl) => onChange(imageUrl)}
                />
              )}
            />
          </div>

          <div className="flex flex-col gap-1">
            <div className="flex flex-row gap-3 max-sm:gap-1 max-sm:flex-col ">
              <div className="flex flex-col w-1/2 max-sm:w-full">
                <Input
                  {...register("firstName")}
                  label="First Name"
                  defaultValue={user?.name?.split(" ")[0]}
                  variant="flat"
                  isInvalid={
                    inputFieldValues?.firstName?.length! <= 3 ||
                    inputFieldValues?.firstName?.length! >= 30
                  }
                  errorMessage={
                    inputFieldValues?.firstName?.length! <= 3
                      ? "Firstname is too short"
                      : "Firstname is too long"
                  }
                  onValueChange={(firstName) =>
                    setFieldValues({ ...inputFieldValues, firstName })
                  }
                />
              </div>

              <div className="flex flex-col w-1/2 max-sm:w-full">
                <Input
                  {...register("lastName")}
                  label="Last Name"
                  defaultValue={user?.name?.split(" ")[1]}
                  variant="flat"
                  isInvalid={
                    inputFieldValues?.lastName?.length! <= 3 ||
                    inputFieldValues?.lastName?.length! >= 30
                  }
                  errorMessage={
                    inputFieldValues?.lastName?.length! <= 3
                      ? "LastName is too short"
                      : "LastName is too long"
                  }
                  onValueChange={(lastName) =>
                    setFieldValues({ ...inputFieldValues, lastName })
                  }
                />
              </div>
            </div>

            <Input
              {...register("email")}
              defaultValue={user?.email?.toLowerCase()}
              type="email"
              label="Email Address"
              placeholder="example@domain.com"
              variant="flat"
              isInvalid={
                !inputFieldValues?.email?.includes(".co") ||
                !inputFieldValues?.email?.includes("@")
              }
              errorMessage="Enter valid type of email"
              onValueChange={(email) =>
                setFieldValues({ ...inputFieldValues, email })
              }
            />

            <div className="flex flex-col gap-1 mb-3">
              <Controller
                name="isPasswordFieldActive"
                control={control}
                render={({ field: { onChange } }) => (
                  <Checkbox
                    className="my-1"
                    size="sm"
                    isSelected={isPasswordFieldsActive}
                    onValueChange={(value) => {
                      onChange(value);
                      setIsPasswordFieldsActive(value);
                    }}
                  >
                    I&apos;d like to change my password
                  </Checkbox>
                )}
              />

              <Input
                {...register("oldPassword")}
                disabled={!isPasswordFieldsActive}
                type="Password"
                label="Current Password"
                variant="flat"
                className="mb-2"
              />

              <Input
                {...register("newPassword")}
                disabled={!isPasswordFieldsActive}
                type="Password"
                label="New Password"
                variant="flat"
                isInvalid={
                  inputFieldValues?.newPassword?.length! < 3 ||
                  inputFieldValues?.newPassword?.length! >= 40
                }
                errorMessage={
                  inputFieldValues?.newPassword?.length! <= 3
                    ? "New passowrd is too short"
                    : "New passowrd is too long"
                }
                onValueChange={(newPassword) =>
                  setFieldValues({ ...inputFieldValues, newPassword })
                }
              />

              <Input
                {...register("confirmPassword")}
                disabled={!isPasswordFieldsActive}
                type="Password"
                label="Confirm Password"
                variant="flat"
                isInvalid={
                  inputFieldValues?.newPassword !==
                  inputFieldValues?.confirmPassword
                }
                errorMessage="Confirm password field must be as same as new password"
                onValueChange={(confirmPassword) =>
                  setFieldValues({ ...inputFieldValues, confirmPassword })
                }
              />
            </div>

            <div className="flex flex-row gap-5 ">
              <Button
                isLoading={isSubmitting}
                type="submit"
                variant="solid"
                color="primary"
              >
                Save Changes
              </Button>

              <Button type="button" variant="light" color="danger">
                Cancel
              </Button>
            </div>
          </div>
        </Card>
      </form>
      <Toaster />
    </div>
  );
};

export default EditUserProfileForm;
