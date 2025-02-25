import styled from 'styled-components';
import H2 from './Common/H2';

const Step1 = props => {
  const { products, setOrders, selectedProduct, setSelectedProduct } = props;

  const handleSelectProduct = product => {
    setSelectedProduct(product);
    setOrders({
      product: product,
      color: '실버',
      length: 0,
      amount: 0,
    });
  };

  return (
    <Step1Base>
      <H2>1. 구매하실 프로파일의 규격을 선택해주세요.</H2>
      <CategoryMenu>
        {products.map(product => (
          <CategoryList
            key={product}
            isSelected={selectedProduct === product}
            onClick={() => handleSelectProduct(product)}
          >
            {product}
          </CategoryList>
        ))}
      </CategoryMenu>
    </Step1Base>
  );
};

export default Step1;

const Step1Base = styled.section`
  padding: 30px 0 15px;
  border-bottom: 1px dotted #cbcbcb;
`;

const CategoryMenu = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  color: #4d5058;
`;

const CategoryList = styled.li`
  background: ${({ isSelected }) => (isSelected ? '#555' : '#fff')};
  color: ${({ isSelected }) => (isSelected ? '#fff' : '#000')};
  flex: 1 1 calc(25% - 15px);
  min-width: 250px;
  // max-width: 300px;
  height: 40px;
  text-align: center;
  line-height: 40px;
  cursor: pointer;
  font-size: 16px;
  border-radius: 3px !important;
  -webkit-border-radius: 3px;
  -moz-border-radius: 3px;
  -o-border-radius: 3px;
  -ms-border-radius: 3px;
`;
