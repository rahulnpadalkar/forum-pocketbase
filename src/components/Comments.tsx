import {
  Flex,
  Textarea,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
const pb = getPb();
import { getPb } from "../pocketbaseUitl";
import { convertItemsToComments } from "../utils";
import { RawComment } from "../types";
import Comment from "./Comment";

export default function Comments({
  isOpen,
  onClose,
  postId,
}: {
  isOpen: boolean;
  onClose: () => void;
  postId: string;
}) {
  const [comment, setComment] = useState<string>("");
  const [comments, setComments] = useState<RawComment[]>([]);

  const toast = useToast();

  const submitComment = async () => {
    try {
      await pb.collection("comments").create({
        comment_text: comment,
        author: pb.authStore.model!.id,
        post: postId,
      });
      loadComments();
      toast({
        title: "Comment Submitted",
        description: "Comment submitted successfully",
        status: "success",
      });
      setComment("");
    } catch (e) {
      toast({
        title: "Comment Submission",
        description: "Comment submission failed",
        status: "error",
      });
    }
  };

  async function loadComments() {
    const result = await pb
      .collection("comments")
      .getList(1, 10, { filter: `post="${postId}"`, expand: "author" });

    const comments = convertItemsToComments(result.items);
    setComments(comments);
  }

  useEffect(() => {
    loadComments();
  }, []);

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Comments</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Flex flexDirection="column">
            <Flex flexDirection="column">
              <Textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="What do you think?"
              />
              <Flex flexDirection="row-reverse">
                <Button
                  backgroundColor="teal.400"
                  color="white"
                  marginTop="3"
                  onClick={submitComment}
                >
                  Comment
                </Button>
              </Flex>
            </Flex>
            {comments.map((c) => (
              <Comment comment={c} key={c.id} loadComments={loadComments} />
            ))}
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
