import { MouseEvent, memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, IconButton } from '../components/Button';
import styled from 'styled-components';

const Home = () => {
  const navigate = useNavigate();
  const redirectToSignupOrLogin = (e: MouseEvent<HTMLButtonElement>) => {
    navigate(e.currentTarget.ariaLabel as string);
  };

  return (
      <HomeContainer>
        <HomeTitle>Todo</HomeTitle>
        <IconButton iconName='btn-delete' iconScale={2} iconFill='#ffffff'
        aria-label='signin' type='button' onClick={redirectToSignupOrLogin} $size='large' $btnType='primary'>
          delete
        </IconButton> 
        <Button aria-label='signin' type='button' onClick={redirectToSignupOrLogin} $size='large' $btnType='primary'>
          SignIn
        </Button>
        <Button aria-label='signup' type='button' onClick={redirectToSignupOrLogin} $size='large' $btnType='dismiss'>SignUp</Button>
      </HomeContainer>
  );
};

const HomeTitle = styled.h1`
  text-align: center;
  margin-bottom: 40%;
  font-size: 3rem;
`;
const HomeContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
`;

export default memo(Home);
