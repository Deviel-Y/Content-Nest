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

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchValue = event.target.value;
    setSearch(newSearchValue);

    const newParams = new URLSearchParams(searchParams.toString());
    newParams.set("search", newSearchValue);
    router.push(`?${newParams.toString()}`);

    if (searchParams.get("genreFilter"))
      newParams.append("genreFilter", searchParams.get("genreFilter")!);
  };

  return (
    <Input
      variant="underlined"
      defaultValue={search}
      description="Search posts by their titles"
      label="Search"
      onChange={handleSearchChange}
    />
  );
};

export default SearchBox;
