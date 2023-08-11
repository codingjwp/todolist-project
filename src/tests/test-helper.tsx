import { createMemoryRouter, Outlet, RouterProvider } from 'react-router-dom';
import Layout from '../styles/Layout';
import Home from '../pages/Home';
import SignInOfUp from '../pages/SignInOfUp';
import Todos from '../pages/Todos';
import { ModalProvider } from '../apis/ModalContext';
import { Router } from '@remix-run/router';

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

export const routerHome: Router = createMemoryRouter(routerElement, { initialEntries: ["/"]});
export const routerSign: Router = createMemoryRouter(routerElement, { initialEntries: ["/signup"]});

export const customRender = (router: Router) => {
  return (
    <ModalProvider>
      <RouterProvider router={router}/>
    </ModalProvider>
  )
}