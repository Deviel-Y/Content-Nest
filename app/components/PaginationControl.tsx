"use client";

import { Pagination } from "@nextui-org/react";
import { useRouter, useSearchParams } from "next/navigation";

interface Props {
  totalPage: number;
  postCount: number;
}

const PaginationControl = ({ totalPage, postCount }: Props) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  if (totalPage <= 1) return null;

  return (
    <Pagination
      showControls
      size="lg"
      className="m-4 w-full"
      initialPage={1}
      total={totalPage}
      onChange={(value) => {
        const newParams = new URLSearchParams(searchParams.toString());

        if (totalPage >= 1) {
          newParams.set("pageNumber", value.toString());
        } else {
          newParams.delete("pageNumber");
        }

        if (searchParams.get("search"))
          newParams.set("search", searchParams.get("search")!);

        if (searchParams.get("genreFilter"))
          newParams.set("genreFilter", searchParams.get("genreFilter")!);

        router.push(`?${newParams.toString()}`);
      }}
    />
  );
};

export default PaginationControl;
