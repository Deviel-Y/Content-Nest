import { Genre } from "@prisma/client";
import { ReactElement } from "react";
import {
  FcFilmReel,
  FcGraduationCap,
  FcHeadset,
  FcLike,
  FcNews,
  FcSmartphoneTablet,
  FcSportsMode,
} from "react-icons/fc";

// This data is used in GenreSelectFilter component
type GenreType = Record<
  Genre,
  { label: string; value: Genre; icon: ReactElement }
>;

export const genreMap: GenreType = {
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
