import React, { useEffect, useMemo, useRef, useState } from 'react';
import { ScrollArea, Stack, Text, Container, Loader } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import _ from 'lodash';
import VideoPostItem from './VideoPostItem';
import { VideoPostData } from '@/types/video-post-data';
import { publicApiClient } from '@/http/public-api-client';
import { useAuth } from '@/utils/use-auth-utils';
import { authenticatedApiClient } from '@/http/authenticated-api-client';
import { VideoReactionData } from '@/types/video-reaction-data';

function VideoPostList() {
  const viewport = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { authData } = useAuth();
  const videoPostsQuery = useQuery({
    queryKey: ['video-posts'],
    queryFn: async () => publicApiClient.searchVideoPosts({ cursor: '' }),
  });

  const userReactionsQuery = useQuery({
    queryKey: ['user_reactions', authData?.id],
    queryFn: async () => authenticatedApiClient.searchUserReactions(authData!.id, {}),
    enabled: !!authData,
  });

  useEffect(() => {
    setIsLoading(videoPostsQuery.isPending || (!!authData && userReactionsQuery.isPending));
  }, [videoPostsQuery.isPending, userReactionsQuery.isPending, authData]);

  const videoPosts = useMemo(() => {
    console.log('videoPosts');
    if (videoPostsQuery.data && Array.isArray(videoPostsQuery.data.results)) {
      const posts = [...videoPostsQuery.data.results] as VideoPostData[];

      if (userReactionsQuery.data && Array.isArray(userReactionsQuery.data)) {
        const reactions = userReactionsQuery.data as VideoReactionData[];
        return posts.map((post) => {
          const reaction = _.find(
            reactions, item => item.videoId === post.id
          );
          return {
            ...post,
            currentVoteType: reaction?.type || '',
          };
        });
      }
      return posts;
    }
    return [];
  }, [videoPostsQuery.data, userReactionsQuery.data]);

  if (videoPostsQuery.isError) {
    return <Text>Error while trying to fetch video posts...</Text>;
  }

  if (isLoading) {
    return (
      <Container>
        <Loader />
        <Text>Loading data...</Text>
      </Container>
    );
  }
  // const [isContinueFetching, setIsContinueFetching] = useState(false);
  // const [lastTimestampLoadedAll, setLastTimestampLoadedAll] = useState(0);
  // const [cursor, setCursor] = useState<string | null>('');

  const loadingOffset = 100;
  const handleScroll = function ({ y }: { x: number; y: number }) {
    const bottomY = viewport.current!.scrollHeight;
    if (bottomY - y < loadingOffset) {
      // TODO: add pagination
    }
  };

  return (
    <>
      <Text>
        All sharing videos
      </Text>
      <ScrollArea
        viewportRef={viewport}
        h={1200}
        offsetScrollbars
        scrollbars="y"
        onScrollPositionChange={handleScroll}
      >
        <Stack gap="md">
          {videoPosts.map((post, index) => (
            <VideoPostItem key={index} post={post} />
          ))}
        </Stack>
      </ScrollArea>

    </>
  );
}

export default VideoPostList;
