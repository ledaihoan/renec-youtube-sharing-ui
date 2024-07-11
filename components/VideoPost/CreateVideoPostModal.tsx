import { useState } from 'react';
import { Button, Group, Modal, Text, Textarea, TextInput } from '@mantine/core';
import axios from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { authenticatedApiClient } from '@/http/authenticated-api-client';

export type CreateVideoPostModalProps = {
  opened: boolean;
  onClose: () => void;
};
export default function CreateVideoPostModal({ opened, onClose }: CreateVideoPostModalProps) {
  const [url, setUrl] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: authenticatedApiClient.addVideoPost,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['video-posts'] });
      onClose();
    },
  });

  const handleUrlChange = async (value: string) => {
    setUrl(value);
    if (value.includes('youtube.com') || value.includes('youtu.be')) {
      setLoading(true);
      try {
        const apiUrl = `https://www.youtube.com/oembed?url=${encodeURIComponent(value)}&format=json`;
        const response = await axios.get(apiUrl);
        const { title: parsedTitle, description: parsedDescription } = response.data;
        setTitle(parsedTitle || '');
        setDescription(parsedDescription || parsedTitle || '');
      } catch (error) {
        console.error('Error fetching video info:', error);
      } finally {
        setLoading(false);
      }
    }
  };
  const handleSubmit = () => {
    // Handle form submission here
    mutation.mutate({ title, url, description });
  };

  return (
    <Modal p="sm" opened={opened} onClose={onClose} title="Create Video Post">
      <TextInput
        label="YouTube URL"
        placeholder="Enter YouTube URL"
        value={url}
        onChange={(event) => handleUrlChange(event.currentTarget.value)}
        required
      />
      <TextInput
        label="Title"
        placeholder="Enter title"
        value={title}
        onChange={(event) => setTitle(event.currentTarget.value)}
        required
        mt="md"
      />
      <Textarea
        label="Description"
        placeholder="Enter description"
        value={description}
        onChange={(event) => setDescription(event.currentTarget.value)}
        mt="md"
      />
      {loading && (<Text size="sm" mt="sm">Fetching video info...</Text>)}
      <Group style={{ float: 'right' }} mt="md" mb="md">
        <Button onClick={onClose} variant="outline">Cancel</Button>
        <Button onClick={handleSubmit}>Create Post</Button>
      </Group>
    </Modal>
  );
}
