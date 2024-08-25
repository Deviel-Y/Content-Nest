/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import { NextUIProvider } from "@nextui-org/react";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider as NextThemesProvider, useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import { PropsWithChildren } from "react";

const AllProviders = ({ children }: PropsWithChildren) => {
  const router = useRouter();
  const { theme } = useTheme();

  return (
    <NextUIProvider navigate={router.push}>
      <SessionProvider>
        <NextThemesProvider attribute="class">{children}</NextThemesProvider>
      </SessionProvider>
    </NextUIProvider>
  );
};

export default AllProviders;
