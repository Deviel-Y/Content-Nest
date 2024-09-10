"use client";
import { Button } from "@nextui-org/react";
import { CldUploadWidget } from "next-cloudinary";

interface Props {
  updateProfile: (imageUrl: string) => void;
}

interface CloudinaryOptions {
  secure_url: string;
}

const UploadPictureButton = ({ updateProfile }: Props) => {
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
          Update Profile Image
        </Button>
      )}
    </CldUploadWidget>
  );
};

export default UploadPictureButton;
