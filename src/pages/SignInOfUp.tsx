import { FormEvent, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { Button } from '../components/Button';
import { InputField } from '../components/InputField';
import { useValidation } from '../hooks/useValidation';
import { postSignInOfUp } from '../apis/TodoAxios';
import { useModalState } from '../hooks/useModalState';

interface SignInOfUpProps {
  titles: string
}

const SignInOfUp = ({titles}: SignInOfUpProps) => {
  const navigete = useNavigate();
  const path = titles.replace(/ /g, "").toLowerCase();
  const [isEmail, isPassword, isDisable, changeEmailData, changePasswordData] = useValidation(titles);
  const { setModalData } = useModalState();
  const PostSignInOfUpApi = (e: FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    postSignInOfUp({
      url: path,
      email: formData.get('email') as string,
      password: formData.get('password') as string,
    }).then((token) => {
      if (token.status >= 400) {
        setModalData({
          modalOpen: true,
          modalType: "error",
          modalMsg: token.data as string,
        })
        return;
      }
      if (token.status === 200 && typeof token.data !== "string") 
        localStorage.setItem('access_token', token.data.access_token);
      navigete(token.status === 200 ? '/todo' : '/signin');
    }).catch(error => {
      throw new Error(`에러 발생 ${String(error)}`);
    }).finally(() => {
      form.reset();
      changeEmailData();
      changePasswordData();
    });
  }

  useEffect(() => {
    if (titles) {
      const form = document.querySelector('form');
      form?.reset();
    }
  }, [titles])
  
  return (
    <SignInOfUpForm onSubmit={PostSignInOfUpApi}>
      <SignInOfUpTitle>{titles}</SignInOfUpTitle>
      <SignInOfUpSpan>
        <SignInOfUpWarring $position='up'>Email</SignInOfUpWarring>
        <InputField aria-label='signinofup-email' name="email" type='text' onChange={changeEmailData} />
        <SignInOfUpWarring $visible={isEmail} >Email에 @를 포함시켜주세요.</SignInOfUpWarring>
      </SignInOfUpSpan>
      <SignInOfUpSpan>
        <SignInOfUpWarring $position='up'>Password</SignInOfUpWarring>
        <InputField aria-label='signinofup-pw' name='password' type='password' onChange={changePasswordData} />
        <SignInOfUpWarring $visible={isPassword}>Password는 8자 이상입니다.</SignInOfUpWarring>
      </SignInOfUpSpan>
      <SignInOfUpSpan $type="link"><Link to={path === 'signin' ? '/signup' : '/signin'}>{path === 'signin' ? 'Sign Up' : 'Sign In'}</Link></SignInOfUpSpan>
      <Button aria-label='signinofup-btn' disabled={isDisable} type='submit' $size='large' $btnType='primary'>{titles}</Button>
    </SignInOfUpForm>
  );
}

const SignInOfUpForm = styled.form`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
`
const SignInOfUpSpan = styled.span<{$type?: string}>`
  width: 100%;
  user-select: none;
  text-align: ${({$type}) => $type === 'link' && 'right'};
`;
const SignInOfUpWarring = styled.p<{$visible?: boolean, $position?: string}>`
  font-weight: 540;
  opacity: ${({$visible}) => $visible === true && 0 };
  ${({$position}) => $position === 'up' ? css`
    margin-bottom: .3rem;
    color: #000000;
  ` : css `
    margin-top: .3rem;
    color: #B60000;
  `} 
`
const SignInOfUpTitle = styled.h1`
  font-size: 3rem;
  text-align: center;
  width: 100%;
  user-select: none;
`
export default SignInOfUp;
