import axios from "axios";

const getAcessToken = () => {
  return localStorage.getItem("access_token");
}
const todoAxios = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

todoAxios.interceptors.request.use(
  (config) => {
    const token = getAcessToken();
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

todoAxios.interceptors.response.use(
  (error) => {
    return Promise.reject(error);
  }
);

interface PostSignInOfUpPRops {
  url: string;
  email: string;
  password: string;
}

export const postSignInOfUp = async ({url, email, password}: PostSignInOfUpPRops) => {
    const res = await todoAxios.post(`auth/${url}`, { email, password });
    return res;
}