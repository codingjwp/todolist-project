import { createBrowserRouter, RouterProvider, Outlet, redirect } from 'react-router-dom';
import GlobalStyles from './styles/GlobalStyles';
import Layout from './styles/Layout';
import Home from './pages/Home';
import SignInOfUp from './pages/SignInOfUp';
import Todos from './pages/Todos';
import NotFound from './pages/NotFound';
import Modal from './components/Modal';
import { useModalState } from './apis/ModalContext';

const hasToken = async (path: string) => {
  const token = localStorage.getItem('access_token') ? true : false;
  if (path !== 'todo' && token) return redirect('/todo');
  else if (path === 'todo' && !token) return redirect('/signin');
  return false;
}

export const routerElement = [
  {
    path: '/',
    element: (
      <Layout>
        <Outlet />
      </Layout>),
    errorElement: <NotFound />,
    children: [
      { index: true, element: <Home />, loader: async () => {return await hasToken('/')} },
      { path: 'signup', element: <SignInOfUp titles='Sign Up' />, loader: async () => {return await hasToken('signup')} },
      { path: 'signin', element: <SignInOfUp titles='Sign In' />, loader: async () => {return await hasToken('signin')} },
      { path: 'todo', element: <Todos />, loader: async () => {return await hasToken('todo')} },
  ]}
];

function App() {
  const routers = createBrowserRouter(routerElement);
  const {modalOpen, modalType, modalMsg} = useModalState();
  return (
    <>
      <GlobalStyles />
      <RouterProvider router={routers} />
      <Modal $isopen={modalOpen} $type={modalType} modalMessage={modalMsg} />
    </>
  );
}

export default App;
