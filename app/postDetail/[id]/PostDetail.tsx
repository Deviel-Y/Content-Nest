import { auth } from "@/app/auth";
import ContentGenreBadge from "@/app/components/ContentGenreBadge";
import { Button, Image } from "@nextui-org/react";
import { Post } from "@prisma/client";
import { default as NextLink } from "next/link";

interface Props {
  post: Post;
  authorId: string;
}

const PostDetail = async ({ post, authorId }: Props) => {
  const session = await auth();
  return (
    <div className="flex flex-col items-center gap-y-3 ">
      <div className="flex flex-col items-center w-full mb-5">
        <h1 className="text-[40px] max-sm:text-2xl font-bold">{post?.title}</h1>

        <h2 className="text-xl max-sm:hidden font-semibold">
          {post?.shortDescription}
        </h2>

        {authorId === session?.user?.id && (
          <Button
            size="lg"
            as={NextLink}
            href={`/editPost/${post.id}`}
            className="self-end -translate-y-16"
            color="secondary"
          >
            Edit Post
          </Button>
        )}
      </div>

      <div className="self-start max-sm:flex max-sm:flex-col justify-center items-center">
        <figure className="float-left me-10 max-sm:block max-sm:my-3">
          <ContentGenreBadge genre={post?.genre}>
            <Image
              src={post.imageUrl}
              alt="Post Image"
              width={250}
              height={250}
            />
          </ContentGenreBadge>
        </figure>

        <article className="text-lg ">{post?.content}</article>
      </div>
    </div>
  );
};

export default PostDetail;
