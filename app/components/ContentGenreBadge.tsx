import { Badge } from "@nextui-org/react";
import { Genre } from "@prisma/client";
import { ReactNode } from "react";

interface Props {
  genre: Genre;
  children: ReactNode;
}

const ganreMap: Record<
  Genre,
  {
    label: string;
    color:
      | "default"
      | "primary"
      | "secondary"
      | "success"
      | "warning"
      | "danger";
  }
> = {
  NEWS: { label: "News", color: "default" },
  ENTERTAINMENT: { label: "Entertainment", color: "primary" },
  HEALTH: { label: "Health", color: "success" },
  EDUCATION: { label: "Education", color: "secondary" },
  CULTURE_AND_ART: { label: "Culture & Art", color: "warning" },
  SPORTS: { label: "Sports", color: "danger" },
  TECHNOLOGY: { label: "Technology", color: "default" },
};

const ContentGenreBadge = ({ genre, children }: Props) => {
  return (
    <Badge
      className="translate-x-8"
      size="lg"
      content={ganreMap[genre].label}
      color={ganreMap[genre].color}
    >
      {children}
    </Badge>
  );
};

export default ContentGenreBadge;
