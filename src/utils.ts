import { RecordModel } from "pocketbase";
import { RawComment, RawPost } from "./types";

export function convertItemsToRawPost(items: RecordModel[]): RawPost[] {
  const posts: RawPost[] = [];
  items.forEach(({ author_id, expand, post_text, id, created, updated }) => {
    const authorDetails = expand!.author_id;
    const author = {
      created: authorDetails.created,
      username: authorDetails.username,
      email: authorDetails.email,
      verified: authorDetails.verified,
    };
    posts.push({ author_id, author, post_text, id, created, updated });
  });

  return posts;
}

export function convertItemsToComments(items: RecordModel[]): RawComment[] {
  const comments: RawComment[] = [];
  items.forEach(({ expand, comment_text, id, created }) => {
    const { username, email, verified } = expand!.author;

    comments.push({
      comment_text,
      id,
      created,
      author: { username, email, verified, created: expand!.author.created },
    });
  });
  return comments;
}
