"use client";

import imagePlaceholder from "@/public/landscape-placeholder-svgrepo-com.jpeg";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Card, Image, Input, Textarea } from "@nextui-org/react";
import { Genre, Post } from "@prisma/client";
import axios from "axios";
import NextLink from "next/image";
import { useRouter } from "next/navigation";
import { Key, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { postSchema, PostSchemaType } from "../validationSchema";
import GenreSelect from "./GenreSelect";
import UploadPictureButton from "./UploadPictureButton";

interface Props {
  authorId: string;
  post?: Post;
}

const PostForm = ({ authorId, post }: Props) => {
  const router = useRouter();
  const genres = Object.values(Genre);
  const [postImageUrl, setPostImageUrl] = useState<string>();
  const [genre, setGenre] = useState<Key | null>();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<PostSchemaType>({
    resolver: zodResolver(postSchema),
  });

  useEffect(() => {
    if (post) setPostImageUrl(post.imageUrl);
  }, [post]);

  return (
    <Card isBlurred shadow="lg" className="p-5 mx-5">
      <h1 className="font-bold text-[30px] mb-3">Create a post</h1>

      <form
        onSubmit={handleSubmit(({ content, shortDescription, title }) => {
          axios
            .post("/api/postContent", {
              content,
              shortDescription,
              title,
              authorId,
              genre,
              imageUrl: postImageUrl,
            })
            .then(() => router.push("/"));
        })}
        className="flex flex-row gap-10 justify-center items-center"
      >
        <section className="w-full h-full flex flex-col gap-y-5 justify-center items-center">
          <div className="flex flex-row gap-x-5 justify-between items-center w-full">
            <div className="w-2/3">
              <Input
                {...register("title")}
                isRequired
                label="Main Title"
                variant="flat"
                defaultValue={post?.title}
              />
              <p
                className={`${
                  errors.title?.message?.length ? "opacity-100" : "opacity-0"
                } transition-opacity duration-250 ease-in-out mt-1 mb-3 text-[13px] text-[#F31260] h-2`}
              >
                {errors.title?.message}
              </p>
            </div>

            <div className="w-1/3">
              <GenreSelect genres={genres} genreSelect={setGenre} />

              <p
                className={`${
                  errors.genre?.message?.length ? "opacity-100" : "opacity-0"
                } transition-opacity duration-250 ease-in-out mt-1 mb-3 text-[13px] text-[#F31260] h-2`}
              >
                {errors.genre?.message}
              </p>
            </div>
          </div>

          <div className="w-full">
            <Textarea
              {...register("shortDescription")}
              defaultValue={post?.shortDescription}
              minRows={3}
              isRequired
              label="Short Description"
              variant="flat"
            />

            <p
              className={`${
                errors.shortDescription?.message?.length
                  ? "opacity-100"
                  : "opacity-0"
              } transition-opacity duration-250 ease-in-out mt-1 mb-3 text-[13px] text-[#F31260] h-2`}
            >
              {errors.shortDescription?.message}
            </p>
          </div>

          <div className="w-full">
            <Textarea
              {...register("content")}
              minRows={10}
              isRequired
              label="Content"
              variant="flat"
              defaultValue={post?.content}
            />

            <p
              className={`${
                errors.content?.message?.length ? "opacity-100" : "opacity-0"
              } transition-opacity duration-250 ease-in-out mt-1 mb-3 text-[13px] text-[#F31260] h-2`}
            >
              {errors.content?.message}
            </p>
          </div>

          <div className="flex flex-row gap-x-5 justify-start items-center translate-y-3 w-full">
            <Button
              isLoading={isSubmitting}
              type="submit"
              color="primary"
              variant="solid"
            >
              Create New Post
            </Button>

            <UploadPictureButton updateProfile={setPostImageUrl} />
          </div>
        </section>

        <section className="w-1/3 h-full flex flex-col justify-center items-start -translate-y-8">
          <Image
            as={NextLink}
            alt="Post Image"
            width={390}
            height={390}
            objectFit="cover"
            src={postImageUrl || imagePlaceholder.src}
          />

          <p
            className={`${
              errors.imageUrl?.message?.length ? "opacity-100" : "opacity-0"
            } transition-opacity duration-250 ease-in-out mt-1 mb-3 text-[13px] text-[#F31260] h-2`}
          >
            {errors.imageUrl?.message}
          </p>
        </section>
      </form>
    </Card>
  );
};

export default PostForm;
