export interface PostItems {
  items: Post[];
  page: number;
  perPage: number;
  totalItems: number;
  totalPages: number;
}

export interface RawPost {
  author_id: string;
  author: AuthorDetails;
  post_text: string;
  id: string;
  created: string;
  updated: string;
}

interface AuthorDetails {
  created: string;
  username: string;
  email: string;
  verified: boolean;
}

export interface RawComment {
  id: string;
  comment_text: string;
  created: string;
  author: AuthorDetails;
}
