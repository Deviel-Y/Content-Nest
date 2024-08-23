"use client";

import { Input } from "@nextui-org/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const SearchBox = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("search") || "");

  useEffect(() => {
    setSearch(searchParams.get("search")!);
  }, [searchParams]);

  const handleSearchChange = (event: string) => {
    const newSearchValue = event;
    setSearch(newSearchValue);

    const newParams = new URLSearchParams(searchParams.toString());
    if (event) {
      newParams.set("search", newSearchValue);
    } else {
      newParams.delete("search");
    }

    if (searchParams.get("genreFilter"))
      newParams.set("genreFilter", searchParams.get("genreFilter")!);

    if (searchParams.get("pageNumber"))
      newParams.set("pageNumber", searchParams.get("pageNumber")!);

    router.push(`?${newParams.toString()}`);
  };

  return (
    <Input
      variant="underlined"
      description="Search posts by their titles"
      label="Search"
      value={search || ""}
      onValueChange={handleSearchChange}
    />
  );
};

export default SearchBox;
