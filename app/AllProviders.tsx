/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import { NextUIProvider } from "@nextui-org/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { useRouter } from "next/navigation";
import { PropsWithChildren } from "react";

const AllProviders = ({ children }: PropsWithChildren) => {
  const router = useRouter();
  const queryClient = new QueryClient();

  return (
    <NextUIProvider navigate={router.push}>
      <SessionProvider>
        <QueryClientProvider client={queryClient}>
          <NextThemesProvider attribute="class">{children}</NextThemesProvider>
        </QueryClientProvider>
      </SessionProvider>
    </NextUIProvider>
  );
};

export default AllProviders;
