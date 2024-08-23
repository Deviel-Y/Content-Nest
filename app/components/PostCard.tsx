import { Button, Card, Link } from "@nextui-org/react";

const PostCard = () => {
  return (
    <Card
      shadow="md"
      isBlurred
      className="flex flex-row max-md:flex-col max-md:h-auto h-64"
    >
      <figure className="mb-3 p-3 flex justify-center align-middle h-full">
        <div className="bg-slate-400 w-56  max-md:w-[250px] max-md:h-[250px] rounded-2xl">
          Image
        </div>
      </figure>

      <div className="flex flex-col p-4 gap-y-2 w-full">
        <p className="text-gray-400 text-sm max-lg:mt-2">date</p>

        <h1 className="font-bold text-[25px]">title</h1>

        <article className="flex-grow">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nihil
          ratione incidunt ab, eveniet facilis odit ullam earum voluptatibus
          voluptatem eaque fuga rem? Error reiciendis nulla est nobis aliquam
          necessitatibus, aliquid voluptates officia commodi vitae impedit sunt
          at magni doloremque id corrupti repellat nostrum libero excepturi qui
          ex ut vel! Reiciendis.
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
