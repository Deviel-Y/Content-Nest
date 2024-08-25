"use client";

import { Switch } from "@nextui-org/react";
import { useTheme } from "next-themes";
import { AiFillMoon, AiFillSun } from "react-icons/ai";

const ThemeToggle = () => {
  const { setTheme, theme } = useTheme();

  localStorage.setItem("theme", theme!);

  return (
    <Switch
      onValueChange={(event) => {
        if (!event) setTheme("light");
        if (event) setTheme("dark");
      }}
      defaultSelected={localStorage.getItem("theme") === "light" ? false : true}
      size="md"
      color="secondary"
      endContent={<AiFillSun />}
      startContent={<AiFillMoon />}
    />
  );
};

export default ThemeToggle;
