import { test, expect } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryRouter, Outlet, RouterProvider } from 'react-router-dom';
import Layout from '../styles/Layout';
import Home from '../pages/Home';
import SignInOfUp from '../pages/SignInOfUp';
import Todos from '../pages/Todos';
import { ModalProvider } from '../apis/ModalContext';


const routerElement = [
  {
    path: '/',
    element: (
      <Layout>
        <Outlet />
      </Layout>),
    children: [
      { index: true, element: <Home /> },
      { path: 'signup', element: <SignInOfUp titles='Sign Up' />},
      { path: 'signin', element: <SignInOfUp titles='Sign In' />},
      { path: 'todo', element: <Todos />},
  ]}
];
export const router = createMemoryRouter(routerElement, { initialEntries: ["/"]});
export const customRender = () => {
  return render(
    <ModalProvider>
      <RouterProvider router={router}/>
    </ModalProvider>
  )
}

test('render sign up and sign in Button', () => {
  customRender();
  const signinBtn = screen.getByRole('button', {name: /signin/i});
  const signupBtn = screen.getByRole('button', {name: /signup/i});

  expect(signinBtn).toBeInTheDocument();
  expect(signupBtn).toBeInTheDocument();
});

test('navigates to signup or signin page when button is clicked', async () => {
  customRender();
  const user = userEvent.setup();
  const signinBtn = screen.getByRole('button', {name: /signin/i});
  user.click(signinBtn);
  await waitFor(() => expect(router.state.location.pathname).toBe('/signin')); 
  router.navigate('/');
  await waitFor(() => expect(router.state.location.pathname).toBe('/')); 
  const signupBtn = screen.getByRole('button', {name: /signup/i});
  user.click(signupBtn);
  await waitFor(() => expect(router.state.location.pathname).toBe('/signup'));
});