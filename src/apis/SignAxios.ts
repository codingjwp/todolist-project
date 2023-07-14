import AxiosInstance from './AxiosInstance';

// 회원가입 API 연결
export async function signPostData(emailValue: string, pwValue: string) {
  try {
    const res = await AxiosInstance.post('/auth/signup', {
      email: emailValue,
      password: pwValue,
    });
    if (res.status === 201) {
      return res;
    }
  } catch (error: any) {
    return error.response;
  }
}

// 로그인 API 연결
export async function signInPostDate(emailValue: string, pwValue: string) {
  try {
    const res = await AxiosInstance.post('/auth/signin', {
      email: emailValue,
      password: pwValue,
    });
    if (res.status === 200) {
      return res;
    }
  } catch (error: any) {
    return error.response;
  }
}
