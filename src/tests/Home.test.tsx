import { test, expect, describe } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { routerHome, customRender} from './test-helper';

describe('Home Page Components', () => {
  test('render sign up and sign in Button', () => {
    render(customRender(routerHome));
    const signinBtn = screen.getByRole('button', {name: /signin/i});
    const signupBtn = screen.getByRole('button', {name: /signup/i});
  
    expect(signinBtn).toBeInTheDocument();
    expect(signupBtn).toBeInTheDocument();
  });
  
  test('navigates to signup or signin page when button is clicked', async () => {
    render(customRender(routerHome));
    userEvent.setup();
    const signinBtn = screen.getByRole('button', {name: /signin/i});
    userEvent.click(signinBtn);
    await waitFor(() => expect(routerHome.state.location.pathname).toBe('/signin')); 
    routerHome.navigate('/');
    await waitFor(() => expect(routerHome.state.location.pathname).toBe('/')); 
    const signupBtn = screen.getByRole('button', {name: /signup/i});
    userEvent.click(signupBtn);
    await waitFor(() => expect(routerHome.state.location.pathname).toBe('/signup'));
  });
});