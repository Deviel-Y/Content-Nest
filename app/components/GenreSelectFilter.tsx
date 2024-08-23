"use client";

import { Autocomplete, AutocompleteItem } from "@nextui-org/react";
import { Genre } from "@prisma/client";
import { useRouter, useSearchParams } from "next/navigation";
import { Key, ReactElement, useState } from "react";
import {
  FcFilmReel,
  FcGraduationCap,
  FcHeadset,
  FcLike,
  FcNews,
  FcSmartphoneTablet,
  FcSportsMode,
} from "react-icons/fc";

interface Props {
  genres: Genre[];
}

const GenreSelectFilter = ({ genres }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [genre, setGenre] = useState(searchParams.get("genreFilter") || "");

  type GenreType = Record<
    Genre,
    { label: string; value: Genre; icon: ReactElement }
  >;

  const genreMap: GenreType = {
    HEALTH: { label: "Health", icon: <FcLike size={25} />, value: "HEALTH" },
    CULTURE_AND_ART: {
      label: "Culture & Art",
      icon: <FcFilmReel size={25} />,
      value: "CULTURE_AND_ART",
    },
    EDUCATION: {
      label: "Education",
      icon: <FcGraduationCap size={25} />,
      value: "EDUCATION",
    },
    ENTERTAINMENT: {
      label: "Entertainment",
      icon: <FcHeadset size={25} />,
      value: "ENTERTAINMENT",
    },
    NEWS: { label: "News", icon: <FcNews size={25} />, value: "NEWS" },
    SPORTS: {
      label: "Sports",
      icon: <FcSportsMode size={25} />,
      value: "SPORTS",
    },
    TECHNOLOGY: {
      label: "Technology",
      icon: <FcSmartphoneTablet size={25} />,
      value: "TECHNOLOGY",
    },
  };

  const handleChange = (value: Key | null) => {
    setGenre(value as string);
    const newParams = new URLSearchParams(searchParams.toString());

    if (value) {
      newParams.set("genreFilter", value as string);
    } else {
      newParams.delete("genreFilter");
    }

    if (searchParams.get("search"))
      newParams.set("search", searchParams.get("search")!);

    if (searchParams.get("pageNumber"))
      newParams.set("pageNumber", searchParams.get("pageNumber")!);

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
