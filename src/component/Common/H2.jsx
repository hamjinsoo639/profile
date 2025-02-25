import styled from 'styled-components';

const H2 = ({ children }) => {
  return <H2Base>{children}</H2Base>;
};

export default H2;

const H2Base = styled.h2`
  margin-bottom: 10px;
  color: #222;
  font-weight: 600;
  font-size: 18px;
`;
