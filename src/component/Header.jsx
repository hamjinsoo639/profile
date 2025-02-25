import styled from 'styled-components';

const Header = () => {
  return (
    <HeaderBase>
      <HeaderTitle src="/images/title.webp" alt="title" />
    </HeaderBase>
  );
};

export default Header;

const HeaderBase = styled.header`
  // border: 1px solid black;
`;

const HeaderTitle = styled.img`
  display: block;
  width: 100%;
  height: 270px;
`;
