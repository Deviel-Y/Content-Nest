import { Genre } from "@prisma/client";
import GenreSelectFilter from "./GenreSelectFilter";
import SearchBox from "./SearchBox";

interface Props {
  genres: Genre[];
}

const ActionBar = ({ genres }: Props) => {
  return (
    <div className="flex max-md:flex-col justify-start max-lg:justify-stretch">
      <div className="w-1/4 max-[1024px]:w-full">
        <SearchBox />
      </div>

      <div className="w-1/4 max-[1024px]:w-full ps-5">
        <GenreSelectFilter genres={genres} />
      </div>
    </div>
  );
};

export default ActionBar;
