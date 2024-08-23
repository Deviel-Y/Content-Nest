import brandIcon from "@/public/brandIcon.png";
import {
  Button,
  Image,
  Link,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Navbar as NextNavbar,
} from "@nextui-org/react";
import NextImage from "next/image";

const Navbar = () => {
  const navLinks: { label: string; value: string; href: string }[] = [
    { label: "Home", value: "home", href: "/" },
    { label: "Posts", value: "posts", href: "/posts" },
    { label: "About Me", value: "aboutMe", href: "/aboutMe" },
  ];

  return (
    <NextNavbar maxWidth="full" height={"60px"} shouldHideOnScroll>
      <div className="grid grid-cols-3 w-full">
        <NavbarBrand>
          <Link href="/">
            <Image
              as={NextImage}
              alt="Brand Icon"
              src={brandIcon.src}
              width="70"
              height="70"
            />
            <p className="font-extrabold text-[20px] ps-2 text-black">
              Content Nest
            </p>
          </Link>
        </NavbarBrand>

        <NavbarContent className="justify-self-center gap-x-10  ">
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

        <NavbarContent className="justify-self-end">
          <Link as={Button} variant="light" color="primary">
            Sign In
          </Link>
        </NavbarContent>
      </div>
    </NextNavbar>
  );
};

export default Navbar;
