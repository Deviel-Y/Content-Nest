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
  news: { label: "News", color: "default" },
  entertainment: { label: "Entertainment", color: "primary" },
  health: { label: "Health", color: "success" },
  education: { label: "Education", color: "secondary" },
  culture_and_art: { label: "Culture And Art", color: "warning" },
  sports: { label: "Sports", color: "danger" },
  tochnology: { label: "Tochnology", color: "default" },
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
