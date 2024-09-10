"use client";
import { Button } from "@nextui-org/react";
import { useSession } from "next-auth/react";
import { CldUploadWidget } from "next-cloudinary";
import { usePathname } from "next/navigation";

interface Props {
  updateProfile: (imageUrl: string) => void;
}

interface CloudinaryOptions {
  secure_url: string;
}

const UploadPictureButton = ({ updateProfile }: Props) => {
  const { data: session } = useSession();
  const path = usePathname();

  return (
    <CldUploadWidget
      options={{ sources: ["local"], multiple: false }}
      uploadPreset="ynupf7so"
      onSuccess={(event) => {
        const photo = event.info as CloudinaryOptions;
        updateProfile(photo.secure_url);
      }}
    >
      {({ open }) => (
        <Button color="secondary" onPress={() => open()}>
          {path === `/editUserProfile/${session?.user?.id}`
            ? "Set Profile Image"
            : "Set Post Image"}
        </Button>
      )}
    </CldUploadWidget>
  );
};

export default UploadPictureButton;
