import { useEffect, useState } from 'react';
import { clearAuthData, getAuthData, storeAuthData } from '@/utils/storage-utils';
import { AuthData } from '@/types/auth-data';
import { publicApiClient } from '@/http/public-api-client';
import { LoginData } from '@/types/login-data.';

export function useAuth() {
  const [authData, setAuthData] = useState<AuthData | null>(null);

  useEffect(() => {
    // Load auth data from IndexedDB on component mount
    getAuthData().then((storedAuthData) => {
      setAuthData(storedAuthData);
    });
  }, []);

  const login = async (newAuthData: AuthData) => {
    await storeAuthData(newAuthData);
    setAuthData(newAuthData);
  };

  const loginUser = async (data: LoginData) => {
    const { email, password } = data;
    const { accessToken } = await publicApiClient.login(email, password);
    await login({ email, loginToken: accessToken });
  };

  const registerUser = async (data: LoginData) => {
    const { email, password } = data;
    const { registrationToken } = await publicApiClient.register(email, password);
    await login({ email, loginToken: registrationToken });
  };

  const logout = async () => {
    await clearAuthData();
    setAuthData(null);
  };

  return { authData, loginUser, logout, registerUser };
}
