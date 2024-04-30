import { Button, Flex, Textarea } from "@chakra-ui/react";
import { useState } from "react";
import { getPb } from "../pocketbaseUitl";
import { useToast } from "@chakra-ui/react";

export const SubmitPost = ({ onSubmit }: { onSubmit: () => void }) => {
  const [post, setPost] = useState("");

  const toast = useToast();

  const submitPost = async () => {
    const pb = getPb();
    try {
      await pb.collection("posts").create({
        post_text: post,
        author_id: pb.authStore.model!.id,
      });

      toast({
        title: "Post submitted.",
        description: "Post succesfully submitted",
        status: "success",
        duration: 7000,
      });
      onSubmit();
      setPost("");
    } catch (e: any) {
      toast({
        title: "Post submission failed",
        description: e["message"],
        status: "error",
      });
    }
  };

  return (
    <Flex flexDirection="column" paddingX="20" paddingY="10">
      <Textarea
        rows={4}
        placeholder="What's on your mind?"
        value={post}
        onChange={(e) => setPost(e.target.value)}
      />
      <Flex flexDirection="row-reverse" marginTop="5">
        <Button backgroundColor="teal.400" color="white" onClick={submitPost}>
          Submit
        </Button>
      </Flex>
    </Flex>
  );
};
