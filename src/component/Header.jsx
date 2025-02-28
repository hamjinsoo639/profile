import styled from 'styled-components';

const Header = () => {
  return (
    <HeaderBase>
      <picture>
        <Title src="/images/product/26.png" alt="product" />
        <source media="(min-width: 768px)" srcSet="/images/title1.jpg" />
        <HeaderTitle src="/images/title.jpg" alt="title" />
      </picture>
    </HeaderBase>
  );
};

export default Header;

const HeaderBase = styled.header`
  // border: 1px solid black;
    background-color: black;
`;

const HeaderTitle = styled.img`
  display: block;
  width: 100%;
`;

const Title = styled.img`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50%;
  height: 50%;
  margin: 0 auto;
  margin-bottom: 40px;
`;
