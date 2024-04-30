import { Flex, Text, Button, IconButton, Image } from "@chakra-ui/react";
import { getPb, logout } from "../pocketbaseUitl";
import { useNavigate } from "react-router-dom";
import { BiBell } from "react-icons/bi";
import { useEffect, useState } from "react";

const pb = getPb();

export const Navigation = () => {
  const navigate = useNavigate();
  const [notificationCount, setNotificationCount] = useState<number>(0);
  const logoutUser = () => {
    logout();
    navigate("/join");
  };

  useEffect(() => {
    pb.collection("comments").subscribe(
      "*",
      (e) => {
        if (e.record.expand?.post.author_id === pb.authStore.model!.id) {
          setNotificationCount(notificationCount + 1);
        }
      },
      { expand: "post" }
    );

    return () => {
      pb.collection("comments").unsubscribe();
    };
  }, []);

  return (
    <Flex direction="row" alignItems="center">
      <Text fontWeight="bold" flex="3" fontSize="22">
        PocketBase Forum Example
      </Text>
      <Flex>
        <Flex alignItems="center" marginX="5">
          <Button backgroundColor="transparent">
            <BiBell size="20" />
            {notificationCount && (
              <Flex
                borderRadius="20"
                background="red.500"
                p="2"
                marginLeft="2"
                height="60%"
                alignItems="center"
              >
                <Text color="white" fontSize="12">
                  {notificationCount}
                </Text>
              </Flex>
            )}
          </Button>
        </Flex>
        <Button onClick={logoutUser} colorScheme="red" color="white">
          Logout
        </Button>
        <Image
          marginLeft="5"
          height="10"
          src={`https://source.boringavatars.com/beam/120/${
            pb.authStore.model!.username
          }`}
        />
      </Flex>
    </Flex>
  );
};
