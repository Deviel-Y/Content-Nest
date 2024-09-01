"use client";

import { Autocomplete, AutocompleteItem } from "@nextui-org/react";
import { Genre } from "@prisma/client";
import { useRouter, useSearchParams } from "next/navigation";
import { Key } from "react";
import { genreMap } from "../data";

interface Props {
  genres: Genre[];
}

const GenreSelectFilter = ({ genres }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleChange = (value: Key | null) => {
    const newParams = new URLSearchParams(searchParams.toString());

    if (value) {
      newParams.set("genreFilter", value as string);
    } else {
      newParams.delete("genreFilter");
    }

    if (searchParams.get("search"))
      newParams.set("search", searchParams.get("search")!);

    if (searchParams.get("pageNumber")) newParams.delete("pageNumber");

    router.push(`?${newParams.toString()}`);
  };

  return (
    <Autocomplete
      onSelectionChange={handleChange}
      description="Filter post by their genres"
      variant="underlined"
      label="Genre Filter"
    >
      {genres.map((genre) => (
        <AutocompleteItem startContent={genreMap[genre].icon} key={genre}>
          {genreMap[genre].label}
        </AutocompleteItem>
      ))}
    </Autocomplete>
  );
};

export default GenreSelectFilter;
