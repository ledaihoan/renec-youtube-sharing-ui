import axios from 'axios';

export const apiClient = {
  login: async (email: string, password: string) => {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, { email, password });
    return response.data;
  },
  register: async (email: string, password: string) => {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/register`, { email, password });
    return response.data;
  },
};
