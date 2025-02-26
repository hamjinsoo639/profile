import styled from 'styled-components';

const Header = () => {
  return (
    <HeaderBase>
      <picture>
        <source media="(min-width: 768px)" srcSet="/images/title1.jpg" />
        <HeaderTitle src="/images/title.jpg" alt="title" />
      </picture>
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
  height: 220px;
`;
