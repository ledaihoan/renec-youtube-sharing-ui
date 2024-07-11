import React from 'react';
import { Card, Text, Group, ActionIcon, Flex, Box } from '@mantine/core';
import { IconThumbUp, IconThumbDown } from '@tabler/icons-react';
import { getYouTubeEmbedUrl } from '@/utils/text-utils';

export type VideoPostProps = {
  url: string;
  title: string;
  sharedBy: string;
  description: string;
  upvoteCount: number;
  downVoteCount: number;
};
function VideoPostItem(
  {
    url,
    title,
    sharedBy,
    description,
    upvoteCount,
    downVoteCount,
  }: VideoPostProps
) {
  const embedUrl = getYouTubeEmbedUrl(url);

  return (
    <Card p="md" withBorder style={{ maxWidth: 800 }}>
      <Flex direction={{ base: 'column', sm: 'row' }} justify="space-between" gap="md">
        {embedUrl ? (
          <Box
            w={{ base: '100%', sm: '60%' }}
            style={{
              maxWidth: 480,
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
        <Flex w={{ base: '100%', sm: '40%' }} direction="column" style={{ flex: 1, maxWidth: 320 }}>
          <div>
              <Text size="lg" fw={700}>{title}</Text>
              <Text size="sm" c="dimmed">Shared by {sharedBy}</Text>
          </div>
          <Group gap="xs">
            <ActionIcon variant="subtle" color="blue">
              <IconThumbUp size="1.1rem" />
            </ActionIcon>
            <Text size="sm">{upvoteCount}</Text>
            <ActionIcon variant="subtle" color="red">
              <IconThumbDown size="1.1rem" />
            </ActionIcon>
            <Text size="sm">{downVoteCount}</Text>
          </Group>
          <Text>Description: </Text>
          <Text>{ description }</Text>
        </Flex>
      </Flex>
    </Card>
  );
}

export default VideoPostItem;
