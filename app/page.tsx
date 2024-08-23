import prisma from "@/prisma/client";
import { Post } from "@prisma/client";
import ActionBar from "./components/ActionBar";
import PostCard from "./components/PostCard";

const Home = async () => {
  const posts: Post[] = await prisma.post.findMany();

  return (
    <>
      <ActionBar />
      <div className="grid grid-cols-2 max-md:grid-cols-1 gap-y-8 gap-x-10 px-5">
        {posts.map((post) => (
          <PostCard
            key={post.id}
            genre={post.genre}
            content={post.content}
            createdAt={post.createdAt.toDateString()}
            title={post.title}
            ImageUrl={post.imageUrl}
          />
        ))}
      </div>
    </>
  );
};

export default Home;
