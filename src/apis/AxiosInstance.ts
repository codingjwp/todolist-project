import axios from 'axios';

const getToken = () => {
  return localStorage.getItem('access_token');
};

// axios 생성
const AxiosInstance = axios.create({
  baseURL: 'https://www.pre-onboarding-selection-task.shop/',
  headers: {
    'Content-Type': 'application/json',
  },
});

AxiosInstance.interceptors.request.use(
  async (config) => {
    config.headers['Content-Type'] = 'application/json';
    const access_token = getToken();
    if (access_token !== null || access_token !== undefined) {
      config.headers.Authorization = `Bearer ${access_token}`;
    }
    return config;
  },
  async (error) => {
    console.error('에러발생', error);
    return Promise.reject(error);
  },
);

AxiosInstance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    return Promise.reject(error);
  },
);

export default AxiosInstance;
