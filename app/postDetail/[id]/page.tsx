import prisma from "@/prisma/client";
import { Post } from "@prisma/client";
import { notFound } from "next/navigation";
import PostDetail from "./PostDetail";
import RecentPosts from "./RecentPosts";

interface Props {
  params: { id: string };
}

const PostDetailPage = async ({ params: { id } }: Props) => {
  const postList: Post[] = await prisma.post.findMany({
    take: 2,
    orderBy: { createdAt: "desc" },
  });

  const post = await prisma.post.findUnique({ where: { id } });
  if (!post) return notFound();

  return (
    <div className="flex flex-col gap-y-5 p-5">
      <PostDetail post={post} authorId={post.authorId} />

      <RecentPosts posts={postList} />
    </div>
  );
};

export default PostDetailPage;
