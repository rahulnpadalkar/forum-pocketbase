import { Button, Flex, Heading } from "@chakra-ui/react";
import { initiateSignUp } from "../pocketbaseUitl";
import { useNavigate } from "react-router-dom";

function Join() {
  const navigate = useNavigate();

  async function join() {
    await initiateSignUp();
    navigate("/");
  }

  return (
    <>
      <Flex
        direction="column"
        alignItems="center"
        height="100%"
        justifyContent="center"
      >
        <Heading>PocketBase Forum Application</Heading>
        <Flex justifyContent="space-evenly" width="20%" marginTop="10">
          <Button onClick={join}>Sign In with Github</Button>
        </Flex>
      </Flex>
    </>
  );
}

export default Join;
