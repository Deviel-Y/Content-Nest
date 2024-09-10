"use client";

import imagePlaceholder from "@/public/landscape-placeholder-svgrepo-com.jpeg";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Card, Image, Input, Textarea } from "@nextui-org/react";
import { Genre, Post } from "@prisma/client";
import axios from "axios";
import NextLink from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
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
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<PostSchemaType>({ resolver: zodResolver(postSchema) });
  const onSubmit = handleSubmit((data) => {
    const postPromise = post
      ? axios
          .patch(`/api/postContent/${post.id}`, { ...data, authorId })
          .then(() => {
            router.push("/");
            router.refresh();
          })
      : axios.post("/api/postContent", { ...data, authorId }).then(() => {
          router.push("/");
          router.refresh();
        });

    toast.promise(postPromise, {
      error: "Unable to create post",
      loading: "Creating new post...",
      success: "Post created successfully",
    });
  });

  useEffect(() => {
    if (post) setPostImageUrl(post.imageUrl);
  }, [post]);

  return (
    <Card isBlurred shadow="lg" className="p-4 m-3">
      <h1 className="font-bold text-[30px] mb-3">Create a post</h1>

      <form
        className="flex flex-col gap-10 max-sm:gap-5 justify-center items-center"
        onSubmit={onSubmit}
      >
        <div className="flex flex-row max-md:flex-col w-full gap-x-10 justify-center items-center">
          <section className="w-full h-full flex flex-col gap-y-5 justify-center items-center max-lg:w-1/2 max-sm:w-full">
            <div className="flex flex-row gap-x-5 justify-between items-center w-full">
              <div className="w-2/3 max-lg:w-1/2">
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

              <div className="w-1/3 max-lg:w-1/2">
                <Controller
                  name="genre"
                  control={control}
                  rules={{ required: "genre is required" }}
                  defaultValue={post?.genre}
                  render={({ field: { onChange } }) => (
                    <GenreSelect
                      currentGenre={post?.genre}
                      genres={genres}
                      genreSelect={(genre) => onChange(genre)}
                    />
                  )}
                />

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
                } transition-opacity duration-250 ease-in-out mt-1 text-[13px] text-[#F31260] h-0`}
              >
                {errors.content?.message}
              </p>
            </div>
          </section>

          <section className="w-1/3 h-full flex flex-col justify-center items-start max-lg:items-end max-lg:w-1/2 max-sm:w-full max-sm:mt-10">
            <Image
              as={NextLink}
              alt="Post Image"
              priority={true}
              width={390}
              height={390}
              objectFit="cover"
              src={postImageUrl || imagePlaceholder.src}
            />

            <p
              className={`${
                errors.imageUrl?.message?.length ? "opacity-100" : "opacity-0"
              } transition-opacity duration-250 ease-in-out mt-1 mb-3 text-[13px] text-[#F31260] h-2 self-start`}
            >
              {errors.imageUrl?.message}
            </p>
          </section>
        </div>

        <div className="flex flex-row gap-x-5 justify-start items-center w-full max-sm:justify-center">
          <Button
            isLoading={isSubmitting}
            disabled={isSubmitting}
            type="submit"
            color="primary"
            variant="solid"
          >
            {post ? "Update New Post" : "Create New Post"}
          </Button>

          <Controller
            name="imageUrl"
            control={control}
            rules={{ required: "Image is required" }}
            defaultValue={post?.imageUrl}
            render={({ field: { onChange } }) => (
              <UploadPictureButton
                updateProfile={(image) => {
                  onChange(image);
                  setPostImageUrl(image);
                }}
              />
            )}
          />
        </div>
      </form>
      <Toaster />
    </Card>
  );
};

export default PostForm;
