import React, { useState } from 'react';
import { Card, Text, Group, ActionIcon, Flex, Box } from '@mantine/core';
import { IconThumbUp, IconThumbDown } from '@tabler/icons-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { getYouTubeEmbedUrl } from '@/utils/text-utils';
import { VideoPostData } from '@/types/video-post-data';
import { authenticatedApiClient } from '@/http/authenticated-api-client';

function VideoPostItem(
  {
    url,
    id,
    title,
    sharedBy,
    description,
    upvoteCount,
    downVoteCount,
    userId,
  }: VideoPostData
) {
  const embedUrl = getYouTubeEmbedUrl(url);
  const queryClient = useQueryClient();
  const [voteData, setVoteData] = useState({ upvoteCount, downVoteCount });
  const [voteType, setVoteType] = useState('');
  const mutation = useMutation({
    mutationFn: (type: string) =>
      authenticatedApiClient.setVideoPostReaction({ videoId: id, type }),
    onSuccess: (data: any, type: string) => {
      queryClient.invalidateQueries({ queryKey: ['video-posts'] });
      const newVoteData = {
        upvoteCount: voteData.upvoteCount + (type === 'upvote' ? 1 : voteType === 'upvote' ? -1 : 0),
        downVoteCount: voteData.downVoteCount + (type === 'downVote' ? 1 : voteType === 'downVote' ? -1 : 0),
      };
      setVoteData(newVoteData);
      setVoteType(type);
    },
  });

  return (
    <Card p="md" withBorder style={{ maxWidth: 1200 }}>
      <Flex direction={{ base: 'column', sm: 'row' }} justify="space-between" gap="md">
        {embedUrl ? (
          <Box
            w={{ base: '100%', sm: '30%' }}
            style={{
              maxWidth: 360,
              margin: 0,
            }}
          >
            <Box
              style={{
                  position: 'relative',
                  height: 0,
                  overflow: 'hidden',
                  paddingBottom: '56.25%', // 16/9 ratio
                  borderStyle: 'none',
                }}>
              <iframe
                title={title}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                }}
                src={embedUrl}
              >
              </iframe>
            </Box>
          </Box>
        ) : <Text>Invalid Youtube URL</Text>}
        <Flex w={{ base: '100%', sm: '70%' }} direction="column" style={{ flex: 1, maxWidth: 840 }}>
          <div>
              <Text size="lg" fw={700}>{title}</Text>
              <ActionIcon onClick={() => mutation.mutate('upvote')} variant="subtle" color="blue">
                { voteType === 'upvote' && (<IconThumbUp fill="" stroke="none" size="1.5rem" />)}
                { voteType !== 'upvote' && (<IconThumbUp size="1.5rem" />)}
              </ActionIcon>
              <ActionIcon onClick={() => mutation.mutate('downVote')} variant="subtle" color="red">
                { voteType === 'downVote' && (<IconThumbDown fill="" stroke="none" size="1.5rem" />)}
                { voteType !== 'downVote' && (<IconThumbDown size="1.5rem" />)}
              </ActionIcon>
              <Text size="sm" c="dimmed">Shared by {sharedBy || userId}</Text>
          </div>
          <Group gap="xs">
            <ActionIcon variant="subtle" color="blue">
              <IconThumbUp size="1.1rem" />
            </ActionIcon>
            <Text size="sm">{voteData.upvoteCount}</Text>
            <ActionIcon variant="subtle" color="red">
              <IconThumbDown size="1.1rem" />
            </ActionIcon>
            <Text size="sm">{voteData.downVoteCount}</Text>
          </Group>
          <Text>Description: </Text>
          <Text>{ description }</Text>
        </Flex>
      </Flex>
    </Card>
  );
}

export default VideoPostItem;
