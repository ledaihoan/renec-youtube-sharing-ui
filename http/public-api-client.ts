import axios from 'axios';
import _ from 'lodash';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

const instance = axios.create({
  baseURL: BASE_URL,
});

export type SearchVideoDto = {
  cursor?: string;
  limit?: number;
  payload?: Record<string, any>;
};

export const publicApiClient = {
  instance,
  login: async (email: string, password: string) => {
    const response = await instance.post('/auth/login', { email, password });
    return response.data;
  },
  register: async (email: string, password: string) => {
    const response = await instance.post('/auth/register', { email, password });
    return response.data;
  },
  searchVideoPosts: async ({ cursor = '', limit = 100, payload }: SearchVideoDto) => {
    const queryParams = _.omitBy({ cursor, limit }, _.isEmpty);
    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/video-posts/search`, payload, { params: queryParams });
    return response.data;
  },
};
