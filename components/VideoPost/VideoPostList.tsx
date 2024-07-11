import React from 'react';
import { Stack } from '@mantine/core';
import VideoPostItem from './VideoPostItem';

const videoPosts = [
  {
    url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    title: 'Never Gonna Give You Up',
    description: 'Rick Astley\'s iconic music video',
    upvoteCount: 1000,
    downVoteCount: 50,
    sharedBy: 'ledaihoan@gmail.com',
  },
];

function VideoPostList() {
  return (
    <Stack gap="md">
      {videoPosts.map((post, index) => (
        <VideoPostItem key={index} {...post} />
      ))}
    </Stack>
  );
}

export default VideoPostList;
