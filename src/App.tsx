import { createBrowserRouter, RouterProvider, Outlet, redirect } from 'react-router-dom';
import { ModalProvider } from './apis/ModalContext';
import GlobalStyles from './styles/GlobalStyles';
import Layout from './styles/Layout';
import Home from './pages/Home';
import SignInOfUp from './pages/SignInOfUp';
import Todos from './pages/Todos';
import NotFound from './pages/NotFound';
import Modal from './components/Modal';

const hasToken = (path: string) => {
  return new Promise((reslove) => {
    const token = localStorage.getItem('access_token') ? true : false;
    if ((path !== 'todo' && token) || (path === 'todo' && !token)) reslove(true)
    reslove(false);
  })
}

const routerElement = [
  {
    path: '/',
    element: (
      <Layout>
        <Outlet />
      </Layout>),
    errorElement: <NotFound />,
    children: [
      { index: true, element: <Home />, loader: async () => {
        try {
          const redirectCheck =  await hasToken('/');
          if (redirectCheck) return redirect('/todo');
          return true;
        }catch(error) {
          throw new Error(`에러 발생 ${String(error)}`);
        }
      }},
      { path: 'signup', element: <SignInOfUp titles='Sign Up' />, loader: async () => {
        try {
          const redirectCheck =  await hasToken('signup');
          if (redirectCheck) return redirect('/todo');
          return true;
        }catch(error) {
          throw new Error(`에러 발생 ${String(error)}`);
        }
      }},
      { path: 'signin', element: <SignInOfUp titles='Sign In' />, loader: async () => {
        try {
          const redirectCheck =  await hasToken('signin');
          if (redirectCheck) return redirect('/todo');
          return true;
        }catch(error) {
          throw new Error(`에러 발생 ${String(error)}`);
        }
      }},
      { path: 'todo', element: <Todos />, loader: async () => {
        try {
          const redirectCheck =  await hasToken('todo');
          if (redirectCheck) return redirect('/signin');
          return true;
        }catch(error) {
          throw new Error(`에러 발생 ${String(error)}`);
        }
      }},
  ]}
];

function App() {
  const routers = createBrowserRouter(routerElement);
  return (
    <ModalProvider>
      <GlobalStyles />
      <RouterProvider router={routers} />
      <Modal />
    </ModalProvider>
  );
}

export default App;
