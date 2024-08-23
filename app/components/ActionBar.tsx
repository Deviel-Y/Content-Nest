import { Genre } from "@prisma/client";
import GenreSelectFilter from "./GenreSelectFilter";
import SearchBox from "./SearchBox";

interface Props {
  genres: Genre[];
}

const ActionBar = ({ genres }: Props) => {
  return (
    <div className="my-5 flex justify-start">
      <div className="w-1/4 max-md:w-1/2 ps-5">
        <SearchBox />
      </div>

      <div className="w-1/4 max-md:w-1/2 ps-5">
        <GenreSelectFilter genres={genres} />
      </div>
    </div>
  );
};

export default ActionBar;
