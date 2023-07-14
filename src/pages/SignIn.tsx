import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useValidation from '../hooks/useValidation';
import { signInPostDate } from '../apis/SignAxios';
import { Button } from '../components/elements/Button';
import { InputField } from '../components/elements/InputField';
import * as S from '../styles/Sign.style';

const SignIn = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<S.FormData>({
    email: '',
    password: '',
  });

  const [emailStatus, passwordStatus] = useValidation(formData);

  const onChangeEmailHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      email: e.target.value,
    });
  };

  const onChangePasswordHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      password: e.target.value,
    });
  };

  const onSubmitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await signInPostDate(formData.email, formData.password);
    if (res.status !== 200) {
      alert('이메일 또는 비밀번호가 올바르지 않습니다.');
      return;
    }
    localStorage.setItem('access_token', res.data.access_token);
    navigate('/todo');
  };

  return (
    <S.AuthWrap>
      <S.Title>로그인</S.Title>
      <S.DivMarginBottom>
        <label>이메일</label>
        <InputField
          type='email'
          testname='email-input'
          onChange={onChangeEmailHandler}
          size='full'
        />
        <div>{emailStatus.message}</div>
      </S.DivMarginBottom>
      <S.DivMarginBottom>
        <label>비밀번호</label>
        <InputField
          type='password'
          testname='password-input'
          onChange={onChangePasswordHandler}
          size='full'
        />
        <div>{passwordStatus.message}</div>
      </S.DivMarginBottom>
      <S.DivMarginBottom>
        <Button
          type='submit'
          testname='signin-button'
          disabled={!(emailStatus.status && passwordStatus.status)}
          onClick={onSubmitHandler}
          size='lr'>
          로그인
        </Button>
      </S.DivMarginBottom>
    </S.AuthWrap>
  );
};

export default SignIn;
