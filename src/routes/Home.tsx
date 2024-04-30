import { Flex, useDisclosure } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { getPb } from "../pocketbaseUitl";
import { Post } from "../components/Post";
import { RawPost } from "../types";
import { convertItemsToRawPost } from "../utils";
import { SubmitPost } from "../components/SubmitPost";
import { Navigation } from "../components/navigation";
import Comments from "../components/Comments";
import NewPosts from "../components/NewPosts";

const Home = () => {
  const [posts, setPosts] = useState<RawPost[]>([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [openCommentsFor, setOpenCommentsFor] = useState("");

  const openCommentsModal = (postId: string) => {
    onOpen();
    setOpenCommentsFor(postId);
  };

  useEffect(() => {
    getPosts();
  }, []);

  async function getPosts() {
    const pb = getPb();
    const { items } = await pb
      .collection("posts")
      .getList(1, 20, { expand: "author_id" });

    const posts: RawPost[] = convertItemsToRawPost(items);

    setPosts(posts);
  }

  return (
    <Flex direction="column">
      <Navigation />
      <SubmitPost onSubmit={getPosts} />
      <NewPosts />
      {posts?.map((p) => (
        <Post post={p} key={p.id} openComments={openCommentsModal} />
      ))}
      {isOpen && (
        <Comments isOpen={isOpen} onClose={onClose} postId={openCommentsFor} />
      )}
    </Flex>
  );
};

export default Home;
