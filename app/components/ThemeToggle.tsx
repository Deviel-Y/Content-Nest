"use client";

import { Switch } from "@nextui-org/react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { AiFillMoon, AiFillSun } from "react-icons/ai";

const ThemeToggle = () => {
  const { setTheme, theme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  const handleChange = (isSelected: boolean) => {
    setTheme(isSelected ? "dark" : "light");
  };

  return (
    <Switch
      onValueChange={handleChange}
      defaultSelected={theme === "dark" ? true : false}
      size="md"
      color="secondary"
      endContent={<AiFillSun />}
      startContent={<AiFillMoon />}
    />
  );
};

export default ThemeToggle;
