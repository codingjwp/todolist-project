import axios, { AxiosError } from "axios";

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
  }
);

interface PostSignInOfUpPRops {
  url: string;
  email: string;
  password: string;
}

export const postSignInOfUp = async ({url, email, password}: PostSignInOfUpPRops) => {
  try{
    const res = await todoAxios.post(`auth/${url}`, { email, password });
    const data = {
      status: res.status,
      data: res.data
    }
    return data;
  } catch(error) {
    const res = (error as AxiosError).response?.data as any;
    const data = {
        status: res.statusCode || 400,
        data: res.message || "에러가 발생하였습니다.",
    }
    return data;
  } 
}

export const postTodoCreate = async (todoContent: string) => {
  try{
    const res = await todoAxios.post('/todos', {
      todo: todoContent
    })
    const data = {
      status: res.status,
      data: res.data
    }
    return data;
  } catch(error) {
    const res = (error as AxiosError).response?.data as any;
    const data = {
        status: res.statusCode || 400,
        data: res.message || "에러가 발생하였습니다.",
    }
    return data;
  }
}