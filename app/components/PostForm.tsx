"use client";

import imagePlaceholder from "@/public/landscape-placeholder-svgrepo-com.jpeg";
import { Button, Card, Image, Input, Textarea } from "@nextui-org/react";
import { Genre } from "@prisma/client";
import NextLink from "next/image";
import { Key, useState } from "react";
import GenreSelect from "./GenreSelect";
import UploadPictureButton from "./UploadPictureButton";

const PostForm = () => {
  const genres = Object.values(Genre);
  const [postImageUrl, setPostImageUrl] = useState<string>();
  const [genre, setGenre] = useState<Key | null>();

  return (
    <Card isBlurred shadow="lg" className="p-5 m-5">
      <h1 className="font-bold text-[30px] mb-5">Create a post</h1>

      <form className="flex flex-row gap-10 justify-center items-center">
        <section className="w-full h-full flex flex-col gap-y-5 justify-center items-center">
          <div className="flex flex-row gap-x-5 justify-between items-center w-full">
            <Input isRequired label="Main Title" variant="flat" />

            <GenreSelect genres={genres} genreSelect={setGenre} />
          </div>

          <Textarea
            minRows={3}
            isRequired
            label="Short Description"
            variant="flat"
          />

          <Textarea minRows={10} isRequired label="Content" variant="flat" />

          <div className="flex flex-row gap-x-5 justify-start items-center translate-y-3 w-full">
            <Button color="primary" variant="solid">
              Create New Post
            </Button>

            <UploadPictureButton updateProfile={setPostImageUrl} />
          </div>
        </section>

        <section className="w-1/3 h-full flex justify-center items-center -translate-y-7">
          <Image
            as={NextLink}
            alt="Post Image"
            width={390}
            height={390}
            objectFit="cover"
            src={postImageUrl || imagePlaceholder.src}
          />
        </section>
      </form>
    </Card>
  );
};

export default PostForm;
