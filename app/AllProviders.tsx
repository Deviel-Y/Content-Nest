/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import { NextUIProvider } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { PropsWithChildren } from "react";

const AllProviders = ({ children }: PropsWithChildren) => {
  const router = useRouter();

  return <NextUIProvider navigate={router.push}>{children}</NextUIProvider>;
};

export default AllProviders;
