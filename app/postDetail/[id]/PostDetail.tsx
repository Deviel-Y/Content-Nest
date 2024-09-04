import ContentGenreBadge from "@/app/components/ContentGenreBadge";
import { Image } from "@nextui-org/react";
import { Post } from "@prisma/client";

interface Props {
  post: Post;
}

const PostDetail = ({ post }: Props) => {
  return (
    <div className="flex flex-col items-center gap-y-3 ">
      <h1 className="text-[40px] font-bold">{post?.title}</h1>

      <h2 className="self-center text-xl font-semibold mb-10">
        {post?.shortDescription}
      </h2>

      <div className="self-start">
        <figure className="float-left me-10">
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
