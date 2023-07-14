import { ReactNode } from 'react';
import { styled } from 'styled-components';

interface LayoutProps {
  children?: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return <LayoutContainer>{children}</LayoutContainer>;
};

const LayoutContainer = styled.div`
  width: 24rem;
  height: 500px;
  padding: 64px 32px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 0.5rem;
  background-color: white;
  box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
`;
