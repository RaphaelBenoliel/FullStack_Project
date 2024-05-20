import {create } from 'apisauce';
import { BASE_URL } from '../config';


const apiClient = create({
    baseURL: `http://${BASE_URL}:3000`,
    headers: { Accept: 'application/vnd.github.v3+json' },
});

export default apiClient;