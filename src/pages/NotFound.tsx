import Layout from '../styles/Layout';
import styled from 'styled-components';

const NotFound = () => {
  return (
    <Layout>
      <NotFoundTitle>404</NotFoundTitle>
      <NotFoundText>Page Not Found</NotFoundText>
    </Layout>
  );
};

const NotFoundTitle = styled.h1`
  margin-top: 3rem;
  text-align: center;
  font-size: 10rem;
`;
const NotFoundText = styled.p`
  margin-top: 3rem;
  text-align: center;
  font-size: 2.5rem;
`;

export default NotFound;
