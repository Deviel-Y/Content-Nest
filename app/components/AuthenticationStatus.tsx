import { Avatar, Button, NavbarContent } from "@nextui-org/react";
import { useSession } from "next-auth/react";
import Link from "next/link";

const AuthenticationStatus = () => {
  const { data, status } = useSession();

  return (
    <NavbarContent className="justify-self-end ">
      {status === "unauthenticated" && (
        <Button
          as={Link}
          variant="shadow"
          color="primary"
          href="/api/auth/signin"
        >
          Sign In
        </Button>
      )}

      {status === "authenticated" && (
        <Avatar
          isBordered
          color="primary"
          src={data.user?.image!}
          showFallback={false}
        />
      )}
    </NavbarContent>
  );
};

export default AuthenticationStatus;
