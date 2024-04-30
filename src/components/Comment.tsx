import {
  Flex,
  IconButton,
  Image,
  Text,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { RawComment } from "../types";
import { format } from "date-fns";
import { useState } from "react";

import { GrEdit } from "react-icons/gr";
import { GiCancel } from "react-icons/gi";
import { RiDeleteBin5Line, RiCheckFill } from "react-icons/ri";
import { getPb } from "../pocketbaseUitl";

const pb = getPb();

export default function Comment({
  comment,
  loadComments,
}: {
  comment: RawComment;
  loadComments: () => void;
}) {
  const toast = useToast();

  const [updateMode, setUpdateMode] = useState<boolean>(false);
  const [updatedCommentText, setUpdatedCommentText] = useState<string>(
    comment.comment_text
  );

  async function deleteComment() {
    try {
      await pb.collection("comments").delete(comment.id);
      toast({
        title: "Comment deleted",
        description: "Comment deleted successfully.",
        status: "success",
      });
      loadComments();
    } catch (e) {
      toast({
        title: "Comment deletion failed",
        description: "Couldn't delete the comment. Something went wrong.",
        status: "error",
      });
    }
  }

  async function updateComment() {
    try {
      await pb
        .collection("comments")
        .update(comment.id, { comment_text: updatedCommentText });
      toast({
        title: "Comment updated",
        description: "Comment updated successfully.",
        status: "success",
      });
      loadComments();
      setUpdateMode(false);
    } catch (e) {
      toast({
        title: "Comment updation failed",
        description: "Couldn't update the comment. Something went wrong.",
        status: "error",
      });
    }
  }

  return (
    <Flex flexDirection="column">
      <Flex>
        <Image
          src={`https://source.boringavatars.com/beam/120/${comment.author.username}`}
          height="10"
          marginRight="3"
        />
        <Flex flexDirection="column">
          <Text fontWeight="bold">{comment.author.username}</Text>
          <Text fontSize="12">{format(comment.created, "PPP p")}</Text>
        </Flex>
      </Flex>
      <Flex>
        {updateMode ? (
          <Flex marginY="3" flex="1">
            <Textarea
              value={updatedCommentText}
              onChange={(e) => setUpdatedCommentText(e.target.value)}
              rows={1}
            />
            <Flex flexDirection="row" marginTop="2" gap="3">
              <IconButton
                icon={<RiCheckFill />}
                aria-label="submit"
                backgroundColor="green.400"
                color="white"
                size="sm"
                onClick={updateComment}
              />
              <IconButton
                icon={<GiCancel />}
                aria-label="cross"
                backgroundColor="red.400"
                color="white"
                size="sm"
                onClick={() => {
                  setUpdateMode(false);
                }}
              />
            </Flex>
          </Flex>
        ) : (
          <Flex marginY="3" flex="1">
            <Text>{comment.comment_text}</Text>
          </Flex>
        )}
        {comment.author.email === pb.authStore.model!.email && (
          <Flex flexDirection="row">
            <IconButton
              icon={<RiDeleteBin5Line />}
              aria-label="delete"
              backgroundColor="transparent"
              onClick={deleteComment}
            />
            <IconButton
              icon={<GrEdit />}
              aria-label="edit"
              backgroundColor="transparent"
              onClick={() => setUpdateMode(true)}
            />
          </Flex>
        )}
      </Flex>
    </Flex>
  );
}
