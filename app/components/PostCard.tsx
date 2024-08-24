import { Button, Card, Image, Link } from "@nextui-org/react";
import { Genre } from "@prisma/client";
import NextImage from "next/image";
import ContentGenreBadge from "./ContentGenreBadge";

interface Props {
  createdAt: string;
  title: string;
  content: string;
  ImageUrl: string;
  genre: Genre;
}

const PostCard = ({ content, createdAt, title, ImageUrl, genre }: Props) => {
  return (
    <Card
      shadow="md"
      isBlurred
      className="flex flex-row max-md:flex-col max-md:h-auto h-64"
    >
      <figure className="p-3 grid grid-cols-1 max-md:justify-center max-md:align-middle h-full">
        <ContentGenreBadge genre={genre}>
          <Image
            as={NextImage}
            alt="Post image"
            src={ImageUrl}
            height={230}
            width={320}
            className="object-cover max-sm:translate-x-5 justify-self-center rounded-2xl "
          />
        </ContentGenreBadge>
      </figure>

      <div className="flex flex-col p-4 gap-y-2 w-full">
        <p className="text-gray-400 text-sm max-[1024px]:mt-2">{createdAt}</p>

        <h1 className="font-bold text-[25px]">{title}</h1>

        <article className="flex-grow text-pretty ">
          {content.slice(0, 150)}...
        </article>

        <Button
          size={"md"}
          as={Link}
          variant="light"
          color="primary"
          href="#"
          className="justify-self-end self-end cursor-pointer "
        >
          Show More
        </Button>
      </div>
    </Card>
  );
};

export default PostCard;
