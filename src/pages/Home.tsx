import { MouseEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';
import { HomeContainer, HomeTitle } from './Home.styles';

const Home = () => {
  const navigate = useNavigate();
  const redirectToSignupOrLogin = (e: MouseEvent<HTMLButtonElement>) => {
    const path = (e.target as Element).getAttribute('aria-label') as string;
    navigate(path);
  };

  return (
    <HomeContainer>
      <HomeTitle>Todo</HomeTitle>
      <Button
        aria-label='signup'
        name='signup'
        type='button'
        onClick={redirectToSignupOrLogin}
        $size='large'
        $btnType='primary'>
        Sign Up
      </Button>
      <Button
        aria-label='signin'
        name='signin'
        type='button'
        onClick={redirectToSignupOrLogin}
        $size='large'
        $btnType='primary'>
        Sign In
      </Button>
    </HomeContainer>
  );
};

export default Home;
