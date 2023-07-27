import { InputField } from '../components/InputField';
import { Button } from '../components/Button';
import styled from 'styled-components';

interface SignInOfUpProps {
  titles: string
}

const SignInOfUp = ({titles}: SignInOfUpProps) => {
  return (
    <SignInOfUpForm>
      <SignInOfUpTitle>{titles}</SignInOfUpTitle>
      <SignInOfUpSpan>Email
        <InputField aria-label='signinofup-input' type='text' />
        <SignInOfUpWarring>이메일에 @를 포함시켜주세요.</SignInOfUpWarring>
      </SignInOfUpSpan>
      <SignInOfUpSpan>Password
        <InputField aria-label='signinofup-pw'type='password' />
        <SignInOfUpWarring>비밀번호는 8자 이상이여야 합니다.</SignInOfUpWarring>
      </SignInOfUpSpan>
      <Button aria-label='signinofup-btn' type='submit' $size='large' $btnType='primary'>{titles}</Button>
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
const SignInOfUpWarring = styled.p`
  margin-top: .3rem;
  font-weight: 540;
  color: #B60000;
`

const SignInOfUpTitle = styled.h1`
  font-size: 3rem;
  text-align: center;
  width: 100%;
`


export default SignInOfUp;
