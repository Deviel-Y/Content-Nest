import ContentGenreBadge from "@/app/components/ContentGenreBadge";
import { Image } from "@nextui-org/react";
import { Post } from "@prisma/client";

interface Props {
  post: Post;
}

const PostDetail = async ({ post }: Props) => {
  return (
    <div className="flex flex-col items-center gap-y-3 ">
      <div className="flex flex-col items-center w-full mb-5">
        <h1 className="text-[40px] max-sm:text-2xl font-bold">{post?.title}</h1>

        <h2 className="text-xl max-sm:hidden font-semibold">
          {post?.shortDescription}
        </h2>
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
