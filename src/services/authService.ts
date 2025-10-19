import axios from 'axios';
import type { User } from '../types';

const API_URL = 'http://your-backend-api.com/api';

export const loginUser = async (credentials: {email: string, password: string}): Promise<User> => {
    const response = await axios.post(`${API_URL}/auth/login`, credentials);
    return response.data.user;
};