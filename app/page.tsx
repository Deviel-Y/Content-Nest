import prisma from "@/prisma/client";
import { Post } from "@prisma/client";
import PostCard from "./components/PostCard";

const Home = async () => {
  const posts: Post[] = await prisma.post.findMany();

  return (
    <div className="grid grid-cols-2 max-md:grid-cols-1 max-md:gap-y-10 gap-x-10">
      {posts.map((post) => (
        <PostCard
          key={post.id}
          content={post.content}
          createdAt={post.createdAt.toDateString()}
          title={post.title}
        />
      ))}
    </div>
  );
};

export default Home;
