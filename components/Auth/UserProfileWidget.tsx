import { Button, Group, Text } from '@mantine/core';
import { AuthData } from '@/types/auth-data';

export type UserProfileWidgetProps = {
  authData: AuthData;
  logout: () => Promise<void>;
};
export default function UserProfileWidget({ authData, logout }: UserProfileWidgetProps) {
  return (
    <Group>
      <Text fw={500}>Welcome { authData.email }</Text>
      <Button onClick={() => logout()} size="sm">Share a video</Button>
      <Button variant="outline" color="red.6" onClick={() => logout()} size="sm">Logout</Button>
    </Group>
  );
}
