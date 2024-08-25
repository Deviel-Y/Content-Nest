"use client";

import lightThemeBrandIcon from "@/public/brandIcon.png";
import darkThemeBrandIcon from "@/public/ContentNestDarkTheme.png";
import {
  Image,
  Link,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
  Navbar as NextNavbar,
} from "@nextui-org/react";
import { useTheme } from "next-themes";
import NextImage from "next/image";
import { useState } from "react";
import AuthenticationStatus from "./components/AuthenticationStatus";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme } = useTheme();

  const navLinks: { label: string; value: string; href: string }[] = [
    { label: "Home", value: "home", href: "/" },
    { label: "Create New Posts", value: "createNewPosts", href: "/newPosts" },
    { label: "About Me", value: "aboutMe", href: "/aboutMe" },
  ];

  return (
    <NextNavbar
      onMenuOpenChange={setIsMenuOpen}
      maxWidth="full"
      height={"60px"}
    >
      <NavbarMenuToggle
        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        className="lg:hidden"
      />
      <div className="grid grid-cols-3 max-[768px]:grid-cols-2 w-full">
        <NavbarBrand>
          <Link href="/">
            <Image
              as={NextImage}
              alt="Brand Icon"
              src={
                theme === "light"
                  ? lightThemeBrandIcon.src
                  : darkThemeBrandIcon.src
              }
              width="70"
              height="70"
            />
            <p
              className={`${
                theme === "dark" && "text-white"
              } font-extrabold max-[426px]:font-bold text-[20px] max-[426px]:text-[17px] ps-2 text-black`}
            >
              Content Nest
            </p>
          </Link>
        </NavbarBrand>

        <NavbarContent className="justify-self-center gap-x-10 max-[768px]:hidden">
          {navLinks.map((navLink) => (
            <NavbarItem key={navLink.value}>
              <Link
                className="text-blue-800 hover:text-blue-950 font-semibold"
                href={navLink.href}
              >
                {navLink.label}
              </Link>
            </NavbarItem>
          ))}
        </NavbarContent>

        <NavbarMenu>
          {navLinks.map((link) => (
            <NavbarMenuItem key={link.value}>
              <Link
                className="text-black font-bold text-xl pt-5"
                href={link.href}
              >
                {link.label}
              </Link>
            </NavbarMenuItem>
          ))}
        </NavbarMenu>

        <AuthenticationStatus />
      </div>
    </NextNavbar>
  );
};

export default Navbar;
