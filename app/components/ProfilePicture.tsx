"use client";
import { Avatar } from "@nextui-org/react";
import { CldUploadWidget } from "next-cloudinary";
import { useState } from "react";

interface Props {
  updateProfile: (imageUrl: string) => void;
}

interface CloudinaryOptions {
  secure_url: string;
}

const ProfilePicture = ({ updateProfile }: Props) => {
  const [profileImage, setProfileImage] = useState<string>("");

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
        <Avatar
          className="hover:scale-110 transition-all cursor-pointer"
          onClick={() => open()}
          isBordered
          color="primary"
          src={profileImage}
          showFallback={false}
        />
      )}
    </CldUploadWidget>
  );
};

export default ProfilePicture;
