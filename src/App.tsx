import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import GlobalStyles from './styles/GlobalStyles';
import Layout from './styles/Layout';
import Home from './pages/Home';
import SignInOfUp from './pages/SignInOfUp';

export const routerElement = [
  {
    path: '/',
    element: (
      <Layout>
        <Outlet />
      </Layout>),
    errorElement: <div>error</div>,
    children: [
      { index: true, element: <Home /> },
      { path: 'signup', element: <SignInOfUp titles='Sign Up' /> },
      { path: 'signin', element: <SignInOfUp titles='Sign In' /> },
  ]}
];

function App() {
  const routers = createBrowserRouter(routerElement);

  return (
    <>
      <GlobalStyles />
      <RouterProvider router={routers} />
    </>
  );
}

export default App;
