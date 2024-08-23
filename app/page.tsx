import prisma from "@/prisma/client";
import { Genre, Post } from "@prisma/client";
import ActionBar from "./components/ActionBar";
import PaginationControl from "./components/PaginationControl";
import PostCard from "./components/PostCard";

interface Props {
  searchParams: { search: string; genreFilter: Genre; pageNumber: number };
}

const Home = async ({
  searchParams: { search, genreFilter, pageNumber },
}: Props) => {
  const genres = Object.values(Genre);
  const genre = genres.includes(genreFilter) ? genreFilter : undefined;

  const pageSize: number = 4;
  const currentPage: number = pageNumber || 1;

  const posts: Post[] = await prisma.post.findMany({
    where: {
      title: { contains: search },
      genre: { equals: genre },
    },
    skip: (currentPage - 1) * pageSize,
    take: pageSize,
  });

  const postCount = await prisma.post.count({
    where: { genre, title: { contains: search } },
  });

  return (
    <>
      <ActionBar genres={Object.values(Genre)} />
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
      <PaginationControl
        postCount={postCount}
        totalPage={Math.ceil(postCount / pageSize)}
      />
    </>
  );
};

export default Home;
