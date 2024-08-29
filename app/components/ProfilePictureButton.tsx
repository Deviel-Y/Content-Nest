"use client";
import { Button } from "@nextui-org/react";
import { CldUploadWidget } from "next-cloudinary";
import { useState } from "react";

interface Props {
  updateProfile: (imageUrl: string) => void;
}

interface CloudinaryOptions {
  secure_url: string;
}

const ProfilePictureButton = ({ updateProfile }: Props) => {
  const [profileImage, setProfileImage] = useState<string>();

  return (
    <CldUploadWidget
      uploadPreset="ynupf7so"
      onSuccess={(event) => {
        const photo = event.info as CloudinaryOptions;
        setProfileImage(photo.secure_url);
        updateProfile(photo.secure_url);
      }}
    >
      {({ open }) => (
        <Button className="me-10" color="secondary" onClick={() => open()}>
          Update Profile Image
        </Button>
      )}
    </CldUploadWidget>
  );
};

export default ProfilePictureButton;
