import {
  Avatar,
  Button,
  Link,
  NavbarContent,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@nextui-org/react";
import { Session } from "next-auth";
import { useSession } from "next-auth/react";

const AuthenticationStatus = () => {
  const { data, status } = useSession();

  return (
    <NavbarContent className="justify-self-end ">
      {status === "unauthenticated" && (
        <Button
          as={Link}
          href="/api/auth/signin"
          variant="shadow"
          color="primary"
        >
          Sign In
        </Button>
      )}

      {status === "authenticated" && (
        <AvatarProfileControl sessionData={data} />
      )}
    </NavbarContent>
  );
};

export default AuthenticationStatus;

export const AvatarProfileControl = ({
  sessionData,
}: {
  sessionData: Session;
}) => {
  return (
    <Popover shadow="lg" color="default">
      <PopoverTrigger>
        <Avatar
          className="hover:scale-110 transition-all cursor-pointer"
          isBordered
          color="primary"
          src={sessionData.user?.image!}
          showFallback={false}
        />
      </PopoverTrigger>
      <PopoverContent>
        {() => (
          <div className="flex flex-col gap-y-1 m-2">
            <p className="text-lg">{sessionData.user?.name}</p>
            <p className="text-gray-500">{sessionData.user?.email}</p>
            <Button className="mt-3 mb-1" size="sm" color="primary">
              Update Profile
            </Button>
            <Button size="sm" color="danger" variant="ghost">
              Sign Out
            </Button>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
};
