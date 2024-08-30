"use client";

import { Autocomplete, AutocompleteItem } from "@nextui-org/react";
import { Genre } from "@prisma/client";
import { Key } from "react";
import { genreMap } from "../data";

interface Props {
  genres: Genre[];
  genreSelect: (genre: Key | null) => void;
}

const GenreSelect = ({ genres, genreSelect }: Props) => {
  return (
    <Autocomplete
      onSelectionChange={genreSelect}
      variant="flat"
      label="Select Genres"
    >
      {genres.map((genre) => (
        <AutocompleteItem startContent={genreMap[genre].icon} key={genre}>
          {genreMap[genre].label}
        </AutocompleteItem>
      ))}
    </Autocomplete>
  );
};

export default GenreSelect;
