import axios, { AxiosInstance } from 'axios';
import { getAuthData, clearAuthData } from '@/utils/storage-utils';
import { parseJwt } from '@/utils/text-utils';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

const logout = async () => {
  await clearAuthData();
  window.location.href = '/';
};
const createAuthenticatedApiClient = (): AxiosInstance => {
  const instance = axios.create({
    baseURL: BASE_URL,
  });

  instance.interceptors.request.use(
    async (config) => {
      const authData = await getAuthData();
      if (authData && authData.loginToken) {
        config.headers.Authorization = `Bearer ${authData.loginToken}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  instance.interceptors.response.use(
    (response) => response,
    async (error) => {
      if (error.response && error.response.status === 401) {
        await logout();
      }
      return Promise.reject(error);
    }
  );

  return instance;
};

const instance = createAuthenticatedApiClient();

export type VideoPostDto = {
  url: string;
  description: string;
  title: string;
};

export type VideoPostReaction = {
  videoId: string;
  type: string;
};
export const authenticatedApiClient = {
  instance,
  addVideoPost: async (payload: VideoPostDto) => {
    const response = await instance.post(`${process.env.NEXT_PUBLIC_API_URL}/video-posts`, payload);
    return response.data;
  },
  setVideoPostReaction: async (payload: VideoPostReaction) => {
    const authData = await getAuthData();
    if (authData && authData.loginToken) {
      let userId;
      try {
        const userData = parseJwt(authData.loginToken);
        userId = userData.id;
      } catch {
        userId = null;
      }
      if (userId) {
        await instance.post(`/users/${userId}/reactions`, payload);
        return;
      }
    }
    await logout();
  },
  removeVideoPostReaction: async (videoId: string) => {
    const authData = await getAuthData();
    if (authData && authData.loginToken) {
      let userId;
      try {
        const userData = parseJwt(authData.loginToken);
        userId = userData.id;
      } catch {
        userId = null;
      }
      if (userId) {
        await instance.delete(`/users/${userId}/reactions/${videoId}`);
        return;
      }
    }
    await logout();
  },
};
