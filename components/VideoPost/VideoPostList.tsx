import React, { useEffect, useRef, useState } from 'react';
import { ScrollArea, Stack, Text, Container, Loader } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';
import VideoPostItem from './VideoPostItem';
import { VideoPostData } from '@/types/video-post-data';
import { publicApiClient } from '@/http/public-api-client';

function VideoPostList() {
  const viewport = useRef<HTMLDivElement>(null);
  const [videoPosts, setVideoPosts] = useState<VideoPostData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const timestamp = dayjs().unix();
  const cacheTimestamp = timestamp - (timestamp % 900);
  const queryHook = useQuery({
    queryKey: ['video-posts', `${cacheTimestamp}`],
    queryFn: async () => publicApiClient.searchVideoPosts({ cursor: '' }),
  });

  useEffect(() => {
    if (!queryHook || queryHook.isPending) {
      setIsLoading(true);
    } else {
      setIsLoading(false);

      if (queryHook.data && Array.isArray(queryHook.data.results)) {
        const fetchedVideoPosts = [...(queryHook.data.results as VideoPostData[])];
        setVideoPosts(fetchedVideoPosts);
      }
    }
  }, [queryHook]);

  if (queryHook.isError) {
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
            <VideoPostItem key={index} {...post} />
          ))}
        </Stack>
      </ScrollArea>

    </>
  );
}

export default VideoPostList;
