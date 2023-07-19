import axios from 'axios';
const BASE_URL = process.env.NEXT_PUBLIC_PICTURES_API_HOST;

export default axios.create({
    baseURL: BASE_URL
});

export const axiosPrivate = axios.create({
    baseURL: BASE_URL,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true
});
