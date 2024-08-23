"use client";

import { Autocomplete, AutocompleteItem } from "@nextui-org/react";
import { Genre } from "@prisma/client";
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
  const genreMap: Record<Genre, { label: string; icon: any }> = {
    HEALTH: { label: "Health", icon: <FcLike size={25} /> },
    CULTURE_AND_ART: { label: "Culture & Art", icon: <FcFilmReel size={25} /> },
    EDUCATION: { label: "Education", icon: <FcGraduationCap size={25} /> },
    ENTERTAINMENT: { label: "Entertainment", icon: <FcHeadset size={25} /> },
    NEWS: { label: "News", icon: <FcNews size={25} /> },
    SPORTS: { label: "Sports", icon: <FcSportsMode size={25} /> },
    TECHNOLOGY: { label: "Technology", icon: <FcSmartphoneTablet size={25} /> },
  };

  return (
    <Autocomplete
      description="Filter post by their genres"
      variant="underlined"
      label="Genre Filter"
    >
      {genres.map((genre) => (
        <AutocompleteItem
          value={genre}
          startContent={genreMap[genre].icon}
          key={genre}
        >
          {genreMap[genre].label}
        </AutocompleteItem>
      ))}
    </Autocomplete>
  );
};

export default GenreSelectFilter;
