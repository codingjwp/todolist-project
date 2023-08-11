
import { test, expect, describe} from 'vitest';
import { render, renderHook, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { customRender, routerSign} from './test-helper';
import { useValidation } from '../hooks/useValidation';


describe('SignInOfUp Page Components', () => {
  test('navigate to sign up or sign in page when Link click', async () => {
    render(customRender(routerSign));
    const user = userEvent.setup();
    let header = screen.getByRole('heading', {level: 1});
    expect(header).toHaveTextContent('Sign Up');
 
    let linkSignIn = screen.getByRole('link', {name: /Sign In/i});
    user.click(linkSignIn);
    await waitFor(() =>expect(routerSign.state.location.pathname).toBe('/signin'));
 
    header = screen.getByRole('heading', {level: 1});
    expect(header).toHaveTextContent('Sign In');
 
    linkSignIn = screen.getByRole('link', {name: /Sign Up/i});
    user.click(linkSignIn);
    await waitFor(() =>expect(routerSign.state.location.pathname).toBe('/signup'));
 });

 test('render useValidation is data check', async () => {
  render(customRender(routerSign));
  const { result} = renderHook(() => useValidation());
  expect(result.current[0]).toEqual(false);
  expect(result.current[1]).toEqual(false);
  expect(result.current[2]).toEqual(true); 
  // const button = screen.getByRole('button', {name: 'signinofup-btn'});
  // expect(button).toBeDisabled();
})
 
//  test('Enable validation and buttons for email and password entry on the SignUp or SignIn page', () => {
//    render(customRender(routerSign));
//  });
 
});
