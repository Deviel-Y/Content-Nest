"use client";

import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import { Post } from "@prisma/client";
import axios from "axios";
import { useSession } from "next-auth/react";
import NextLink from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { CiEdit, CiTrash } from "react-icons/ci";

interface Props {
  post: Post;
  authorId: string;
}

const DetailPostActionBar = ({ authorId, post }: Props) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [isLoading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const { data: session } = useSession();

  if (authorId !== session?.user?.id) return null;

  return (
    <div className="flex flex-row self-center gap-x-5 mt-5">
      <Button
        endContent={<CiEdit size={20} />}
        size="lg"
        as={NextLink}
        href={`/editPost/${post.id}`}
        color="secondary"
      >
        Edit
      </Button>

      <Button
        onPress={onOpen}
        size="lg"
        color="danger"
        endContent={<CiTrash size={20} />}
      >
        Delete
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Confirm Deletion
              </ModalHeader>
              <ModalBody>
                <p>
                  Are you sure you want to delete this post? This action cannot
                  be undone.
                </p>
              </ModalBody>
              <ModalFooter>
                <Button
                  isDisabled={isLoading}
                  color="danger"
                  onPress={() => {
                    setLoading(true);
                    const deletePromise = axios
                      .delete(`/api/postContent/${post.id}`)
                      .then(() => {
                        router.push("/");
                        router.refresh();
                      })
                      .finally(() => setLoading(false));

                    toast.promise(deletePromise, {
                      success: "Post Deleted Successfully",
                      loading: "Deletting...",
                      error: "Unable to Delete Post",
                    });
                  }}
                >
                  Delete
                </Button>
                <Button color="primary" onPress={onClose}>
                  Cancel
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

      <Toaster />
    </div>
  );
};

export default DetailPostActionBar;
