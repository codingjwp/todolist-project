import styled from 'styled-components';

export interface FormData {
  email: string;
  password: string;
}

export const Title = styled.h1`
  margin-top: 40px;
  margin-bottom: 40px;
  font-weight: 700;
  font-size: 1.875rem;
  line-height: 2.25rem;
  text-align: center;
`;

export const AuthWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

export const DivMarginBottom = styled.div`
  margin-bottom: 20px;
  & div {
    color: red;
  }
`;
