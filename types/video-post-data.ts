export type VideoPostData = {
  url: string;
  userId: string;
  title: string;
  description: string;
  sharedBy?: string;
  upvoteCount: number;
  downVoteCount: number;
};
