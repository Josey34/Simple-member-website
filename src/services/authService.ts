import axios from 'axios';
import type { User } from '../types';

const API_URL = 'http://your-backend-api.com/api';

export const loginUser = async (credentials: {email: string, password: string}): Promise<User> => {
    try {
        const response = await axios.post(`${API_URL}/auth/login`, credentials);
        return response.data.user;
    } catch(e) {
        if (e instanceof Error) {
            console.error(e.message);
        } else {
            console.error("An unknown error occurred:", e);
        }
        throw e;
    }
};