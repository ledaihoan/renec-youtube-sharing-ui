import { useEffect, useState } from 'react';
import { clearAuthData, getAuthData, storeAuthData } from '@/utils/storage-utils';
import { AuthData } from '@/types/auth-data';
import { publicApiClient } from '@/http/public-api-client';
import { LoginData } from '@/types/login-data.';
import { parseJwt } from '@/utils/text-utils';

export function useAuth() {
  const [authData, setAuthData] = useState<AuthData | null>(null);

  useEffect(() => {
    // Load auth data from IndexedDB on component mount
    getAuthData().then((storedAuthData) => {
      if (storedAuthData && storedAuthData.id) {
        setAuthData(storedAuthData);
      } else {
        clearAuthData(); // Clear invalid auth data
      }
    });
  }, []);

  const login = async (newAuthData: AuthData) => {
    await storeAuthData(newAuthData);
    setAuthData(newAuthData);
  };

  const loginUser = async (data: LoginData) => {
    const { email, password } = data;
    const { accessToken } = await publicApiClient.login(email, password);
    await login({ email, loginToken: accessToken, id: parseJwt(accessToken).id });
  };

  const registerUser = async (data: LoginData) => {
    const { email, password } = data;
    const { registrationToken } = await publicApiClient.register(email, password);
    await login({ email, loginToken: registrationToken, id: parseJwt(registrationToken).id });
  };

  const logout = async () => {
    await clearAuthData();
    setAuthData(null);
  };

  return { authData, loginUser, logout, registerUser };
}
