import axios, { AxiosError } from 'axios';

const getAcessToken = () => {
  return localStorage.getItem('access_token');
};
const todoAxios = axios.create({
  baseURL: import.meta.env.VITE_API_URL as string,
});

todoAxios.interceptors.request.use((config) => {
  const token = getAcessToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

interface PostSignInOfUpPRops {
  url: string;
  email: string;
  password: string;
}

interface TodoDataProps {
  id: string;
  isCompleted: boolean;
  todo: string;
  userId: string;
}

interface RequestProps {
  statusCode: number;
  message: string;
}

export const postSignInOfUp = async ({ url, email, password }: PostSignInOfUpPRops) => {
  try {
    const res = await todoAxios.post<string | { access_token: string }>(`auth/${url}`, {
      email,
      password,
    });
    const data = {
      status: res.status,
      data: res.data,
    };
    return data;
  } catch (error: unknown) {
    const res = (error as AxiosError).response?.data as RequestProps;
    const data = {
      status: res.statusCode || 400,
      data: Array.isArray(res.message)
        ? res.message.join(' ')
        : res.message || '에러가 발생하였습니다.',
    };
    return data;
  }
};

export const createTodoList = async (todoContent: string) => {
  try {
    const res = await todoAxios.post<TodoDataProps>('/todos', {
      todo: todoContent,
    });
    const data = {
      status: res.status,
      data: res.data,
    };
    return data;
  } catch (error: unknown) {
    const res = (error as AxiosError).response?.data as RequestProps;
    const data = {
      status: res.statusCode || 400,
      data: res.message || '에러가 발생하였습니다.',
    };
    return data;
  }
};

export const getTodoList = async () => {
  try {
    const res = await todoAxios.get<TodoDataProps[]>('/todos');
    const data = {
      status: res.status,
      data: res.data,
    };
    return data;
  } catch (error: unknown) {
    const res = (error as AxiosError).response?.data as RequestProps;
    const data = {
      status: res.statusCode || 400,
      data: res.message || '에러가 발생하였습니다.',
    };
    return data;
  }
};

export const updateTodoList = async (id: string, isCompleted: boolean, todo: string) => {
  try {
    const res = await todoAxios.put<TodoDataProps>(`/todos/${id}`, {
      todo: todo,
      isCompleted: isCompleted,
    });
    const data = {
      status: res.status,
      data: res.data,
    };
    return data;
  } catch (error: unknown) {
    const res = (error as AxiosError).response?.data as RequestProps;
    const data = {
      status: res.statusCode || 400,
      data: res.message || '에러가 발생하였습니다.',
    };
    return data;
  }
};

export const deleteTodoList = async (id: string) => {
  try {
    const res = await todoAxios.delete<string>(`/todos/${id}`);
    const data = {
      status: res.status,
      data: res.data,
    };
    return data;
  } catch (error: unknown) {
    const res = (error as AxiosError).response?.data as RequestProps;
    const data = {
      status: res.statusCode || 400,
      data: res.message || '에러가 발생하였습니다.',
    };
    return data;
  }
};
