import { Container } from '@mantine/core';
import { ColorSchemeToggle } from '@/components/ColorSchemeToggle/ColorSchemeToggle';
import VideoPostList from '@/components/VideoPost/VideoPostList';

export default function HomePage() {
  return (
    <Container size="xl" py="xl">
      <VideoPostList />
      <ColorSchemeToggle />
    </Container>
  );
}
