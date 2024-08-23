"use client";

import { Input } from "@nextui-org/react";
import { useRouter } from "next/navigation";

const SearchBox = () => {
  const router = useRouter();

  return (
    <Input
      variant="underlined"
      description="Search posts by their titles"
      label="Search"
      onChange={(event) => {
        router.push(`?search=${event.target.value}`);
      }}
    />
  );
};

export default SearchBox;
