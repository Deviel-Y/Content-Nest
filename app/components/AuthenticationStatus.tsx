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
  const [isPopoverOpen, setIsPopoverOpen] = useState<boolean>(false);

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