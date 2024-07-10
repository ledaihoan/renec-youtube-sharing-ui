import { Container } from '@mantine/core';
import { ColorSchemeToggle } from '@/components/ColorSchemeToggle/ColorSchemeToggle';

export default function HomePage() {
  return (
    <Container size="xl">
      <ColorSchemeToggle />
    </Container>
  );
}
