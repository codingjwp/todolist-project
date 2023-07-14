import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useValidation from '../hooks/useValidation';
import { signPostData } from '../apis/SignAxios';
import { Button } from '../components/elements/Button';
import { InputField } from '../components/elements/InputField';
import * as S from '../styles/Sign.style';

const SignUp = () => {
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
    const data = await signPostData(formData.email, formData.password);
    if (data.status !== 201) {
      alert('동일한 이메일이 존재합니다');
      return;
    }
    navigate('/signin');
  };

  return (
    <S.AuthWrap>
      <S.Title>회원가입</S.Title>
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
      <div>
        <Button
          type='submit'
          testname='signup-button'
          disabled={!(emailStatus.status && passwordStatus.status)}
          onClick={onSubmitHandler}
          size='lr'>
          회원가입
        </Button>
      </div>
    </S.AuthWrap>
  );
};

export default SignUp;
