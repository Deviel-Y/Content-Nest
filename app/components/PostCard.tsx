import { Button, Card, Image, Link } from "@nextui-org/react";
import { Post } from "@prisma/client";
import NextImage from "next/image";
import ContentGenreBadge from "./ContentGenreBadge";

interface Props {
  post: Post;
}

const PostCard = ({ post }: Props) => {
  return (
    <Card
      shadow="md"
      isBlurred
      className="flex flex-row max-md:flex-col max-md:h-auto h-64 dark:bg-[#27272A]"
    >
      <figure className="p-3 grid grid-cols-1 max-md:justify-center max-md:align-middle h-full">
        <ContentGenreBadge genre={post.genre}>
          <Image
            as={NextImage}
            alt="Post image"
            src={post.imageUrl}
            height={230}
            width={320}
            className="object-cover max-sm:translate-x-5 justify-self-center rounded-2xl "
          />
        </ContentGenreBadge>
      </figure>

      <div className="flex flex-col p-4 gap-y-2 w-full">
        <p className="text-gray-400 text-sm max-[1024px]:mt-2">
          {post.createdAt.toDateString()}
        </p>

        <h1 className="font-bold text-[25px]">{post.title}</h1>

        <article className="flex-grow text-pretty ">
          {post.shortDescription}
        </article>

        <Button
          size={"md"}
          as={Link}
          variant="light"
          color="primary"
          href={`/postDetail/${post.id}`}
          className="justify-self-end self-end cursor-pointer "
        >
          Show More
        </Button>
      </div>
    </Card>
  );
};

export default PostCard;
