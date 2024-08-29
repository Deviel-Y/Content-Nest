"use client";

import {
  Avatar,
  Button,
  Link,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  NavbarContent,
  Popover,
  PopoverContent,
  PopoverTrigger,
  useDisclosure,
} from "@nextui-org/react";
import { Session } from "next-auth";
import { signOut, useSession } from "next-auth/react";
import { useState } from "react";
import useUsers from "../hooks/useUsers";
import ThemeToggle from "./ThemeToggle";

interface SessionProvider {
  provider: string;
}

const AuthenticationStatus = () => {
  const { data, status } = useSession();

  return (
    <NavbarContent className="justify-self-end ">
      <ThemeToggle />
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
  const provider = sessionData.user as SessionProvider;

  const [isPopoverOpen, setIsPopoverOpen] = useState<boolean>(false);
  const { data: users } = useUsers();
  const user = users?.find((user) => user.id === sessionData.user?.id);

  return (
    <Popover
      isOpen={isPopoverOpen}
      onOpenChange={() => setIsPopoverOpen(!isPopoverOpen)}
      shadow="lg"
      color="default"
    >
      <PopoverTrigger>
        <Avatar
          className="hover:scale-110 transition-all cursor-pointer"
          isBordered
          color="primary"
          src={user?.imageUrl || sessionData.user?.image!}
        />
      </PopoverTrigger>
      <PopoverContent>
        {() => (
          <div className="flex flex-col gap-y-1 m-2">
            <p className="text-lg">{user?.name || sessionData.user?.name}</p>
            <p className="text-gray-500 mb-3">
              {user?.email || sessionData.user?.email}
            </p>
            {provider.provider === "credentials" && (
              <Button
                as={Link}
                href={`/editUserProfile/${user?.id}`}
                className="mt-3 mb-1"
                size="sm"
                color="primary"
              >
                Update Profile
              </Button>
            )}
            <SignOutConfirmation />
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
};

export const SignOutConfirmation = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Button size="sm" color="danger" variant="ghost" onPress={onOpen}>
        Sign Out
      </Button>
      <Modal backdrop="blur" isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col">
                Sign Out Confirmation
              </ModalHeader>
              <ModalBody>
                <p>Are you sure you want to sign out?</p>
              </ModalBody>
              <ModalFooter>
                <Button
                  size="sm"
                  color="primary"
                  variant="solid"
                  onPress={onClose}
                >
                  Close
                </Button>
                <Button size="sm" color="danger" onPress={() => signOut()}>
                  Sign Out
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
