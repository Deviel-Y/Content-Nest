import { Button, Card, Image, Link } from "@nextui-org/react";
import NextImage from "next/image";

interface Props {
  createdAt: string;
  title: string;
  content: string;
  ImageUrl: string;
}

const PostCard = ({ content, createdAt, title, ImageUrl }: Props) => {
  return (
    <Card
      shadow="md"
      isBlurred
      className="flex flex-row max-md:flex-col max-md:h-auto h-64"
    >
      <figure className="p-3 flex justify-center align-middle h-full">
        <Image
          as={NextImage}
          alt="Post image"
          src={ImageUrl}
          className="bg-slate-400 w-56  max-md:w-[250px] max-md:h-[250px] rounded-2xl"
        />
      </figure>

      <div className="flex flex-col p-4 gap-y-2 w-full">
        <p className="text-gray-400 text-sm max-lg:mt-2">{createdAt}</p>

        <h1 className="font-bold text-[25px]">{title}</h1>

        <article className="flex-grow">{content}</article>

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
