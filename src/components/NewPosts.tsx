import { Button, Flex, Icon, Text } from "@chakra-ui/react";
import { getPb } from "../pocketbaseUitl";
import { FaArrowUp } from "react-icons/fa6";
import { useEffect, useState } from "react";

const pb = getPb();

export default function NewPosts() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    pb.collection("posts").subscribe("*", (e) => {
      if (e.record.author_id !== pb.authStore.model!.id) {
        setShow(true);
      }
    });

    return () => {
      pb.collection("posts").unsubscribe();
    };
  }, []);

  return (
    <Flex justifyContent="center">
      <Flex alignItems="center" p="3" fontWeight="bold" fontSize="12">
        {show && (
          <>
            <Button borderRadius="25" color="white" backgroundColor="green.400">
              <FaArrowUp />
              <Text marginLeft="2">New Posts</Text>
            </Button>
          </>
        )}
      </Flex>
    </Flex>
  );
}
