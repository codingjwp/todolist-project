import { FormEvent } from 'react';
import { InputField } from '../components/InputField';
import { Button } from '../components/Button';
import styled, { css } from 'styled-components';
import { useValidation } from '../hooks/useValidation';
import { postSignInOfUp } from '../apis/TodoAxios'; 
interface SignInOfUpProps {
  titles: string
}

const SignInOfUp = ({titles}: SignInOfUpProps) => {
  const [isEmail, isPassword, isDisable, changeEmailData, changePasswordData] = useValidation();
  const PostSignInOfUpApi = async (e: FormEvent) => {
    e.preventDefault();
    const form = new FormData(e.target as HTMLFormElement);
    const data = await postSignInOfUp({
      url: titles.replace(/ /g, "") .toLowerCase(),
      email: form.get('email') as string,
      password: form.get('password') as string,
    });
  }
  
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
const SignInOfUpSpan = styled.span`
  width: 100%;
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
`

export default SignInOfUp;
