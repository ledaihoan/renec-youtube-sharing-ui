import { Container, Group, Text } from '@mantine/core';
import LoginWidget from '@/components/Auth/LoginWidget';
import UserProfileWidget from '@/components/Auth/UserProfileWidget';
import { useAuth } from '@/utils/use-auth-utils';

export default function BodyHeader() {
  const { authData, loginUser, logout, registerUser } = useAuth();
  return (
    <Container size="xl" mt={10}>
      <Group justify="space-between" style={{ height: '100%' }}>
        <Text size="xl" fw={700}>Funny Movies</Text>
        {!authData && (
          <LoginWidget loginUser={loginUser} registerUser={registerUser} />
        )}
        { authData && (<UserProfileWidget authData={authData} logout={logout} />)}
      </Group>
    </Container>
  );
}
