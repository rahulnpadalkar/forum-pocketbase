import {
  Flex,
  IconButton,
  Image,
  Text,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { RawPost } from "../types";
import { GoHeart, GoComment } from "react-icons/go";
import { format } from "date-fns";
import { BiLike } from "react-icons/bi";
import { RiDeleteBin5Line, RiCheckFill } from "react-icons/ri";
import { getPb } from "../pocketbaseUitl";
import { GrEdit } from "react-icons/gr";
import { GiCancel } from "react-icons/gi";
import { useState } from "react";

const pb = getPb();

export const Post = ({
  post,
  openComments,
}: {
  post: RawPost;
  openComments: (postId: string) => void;
}) => {
  const [updateMode, setUpdateMode] = useState<boolean>(false);
  const [updatedPostText, setUpdatedPostText] = useState<string>(
    post.post_text
  );

  const toast = useToast();

  async function deletePost() {
    try {
      await pb.collection("posts").delete(post.id);
      toast({
        title: "Post deleted",
        description: "Post deleted successfully.",
        status: "success",
      });
    } catch (e) {
      toast({
        title: "Post deletion failed",
        description: "Couldn't delete the post. Something went wrong.",
        status: "error",
      });
    }
  }

  async function updatePost() {
    try {
      await pb
        .collection("posts")
        .update(post.id, { post_text: updatedPostText });
      toast({
        title: "Post updated",
        description: "Post updated successfully.",
        status: "success",
      });
      setUpdateMode(false);
    } catch (e) {
      toast({
        title: "Post updation failed",
        description: "Couldn't update the post. Something went wrong.",
        status: "error",
      });
    }
  }

  return (
    <Flex flexDirection="column" margin="5">
      <Flex flexDirection="column">
        <Flex alignItems="center">
          <Image
            src={`https://source.boringavatars.com/beam/120/${post.author.username}`}
            height="10"
            marginRight="3"
          />
          <Flex flexDirection="column">
            <Text fontWeight="bold">{post.author.username}</Text>
            <Text fontSize="13">{format(post.created, "PPP p")}</Text>
          </Flex>
        </Flex>
      </Flex>
      <Flex marginY="4">
        {updateMode ? (
          <Flex flexDirection="column" flex={1}>
            <Textarea
              value={updatedPostText}
              onChange={(e) => setUpdatedPostText(e.target.value)}
              rows={2}
            />
            <Flex flexDirection="row" marginTop="2" gap="3">
              <IconButton
                icon={<RiCheckFill />}
                aria-label="submit"
                backgroundColor="green.400"
                color="white"
                size="sm"
                onClick={updatePost}
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
          <Text>{post.post_text}</Text>
        )}
      </Flex>
      <Flex>
        <Flex>
          <IconButton
            icon={<GoHeart />}
            aria-label="love"
            background="transparent"
          />
          <IconButton
            icon={<BiLike />}
            aria-label="like"
            background="transparent"
          />
          <IconButton
            icon={<GoComment />}
            aria-label="like"
            background="transparent"
            onClick={() => {
              openComments(post.id);
            }}
          />
          {post.author_id === pb.authStore.model!.id && (
            <>
              <IconButton
                icon={<RiDeleteBin5Line />}
                aria-label="delete"
                background="transparent"
                onClick={deletePost}
              />
              <IconButton
                icon={<GrEdit />}
                aria-label="edit"
                background="transparent"
                onClick={() => setUpdateMode(true)}
              />
            </>
          )}
        </Flex>
      </Flex>
    </Flex>
  );
};
