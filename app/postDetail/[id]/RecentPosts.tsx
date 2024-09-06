import PostCard from "@/app/components/PostCard";
import { Post } from "@prisma/client";

interface Props {
  posts: Post[];
}

const RecentPosts = ({ posts }: Props) => {
  return (
    <div className="mt-5 flex flex-col items-start">
      <h2 className="mb-5 font-bold text-[30px]">Recent Posts</h2>

      <div className="grid grid-cols-2 max-sm:flex max-sm:flex-col gap-5 mb-3 w-full">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default RecentPosts;
