import { Button, Group, Text } from '@mantine/core';
import { useState } from 'react';
import { AuthData } from '@/types/auth-data';
import CreateVideoPostModal from '@/components/VideoPost/CreateVideoPostModal';

export type UserProfileWidgetProps = {
  authData: AuthData;
  logout: () => Promise<void>;
};
export default function UserProfileWidget({ authData, logout }: UserProfileWidgetProps) {
  const [modalOpened, setModalOpened] = useState(false);
  return (
    <>
      <Group>
        <Text fw={500}>Welcome { authData.email }</Text>
        <Button disabled={modalOpened} onClick={() => setModalOpened(true)} size="sm">Share a video</Button>
        <Button variant="outline" color="red.6" onClick={() => logout()} size="sm">Logout</Button>
      </Group>
      <CreateVideoPostModal
        opened={modalOpened}
        onClose={() => setModalOpened(false)}
      />
    </>
  );
}
