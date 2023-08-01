import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import GlobalStyles from './styles/GlobalStyles';
import Layout from './styles/Layout';
import Home from './pages/Home';
import SignInOfUp from './pages/SignInOfUp';
import Todos from './pages/Todos';
import Modal from './components/Modal';
import { useModalState } from './apis/ModalContext';

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
      { path: 'todo', element: <Todos /> },
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
