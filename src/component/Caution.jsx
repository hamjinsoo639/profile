import styled from 'styled-components';

const Caution = () => {
  return (
    <CautionBase>
      <CautionTitle>※ 반드시 확인 후 결제를 진행해 주세요!</CautionTitle>

      <CautionMenu>
        <CautionItem>
          - 판매자에게 견적서를 전송해주신 뒤 총 견적금액을 네이버에서 주문해주시면 됩니다.
        </CautionItem>
        <CautionItem>
          - 절단상품은 주문과 동시에 원본을 재단하여 제작되기 때문에 <Strong>교환/환불/취소</Strong>
          가 불가능합니다.
        </CautionItem>
        <CautionItem>
          - 사이즈를 입력하실 때에는 반드시 mm단위로 입력해 주시기 바랍니다. (
          <Strong>100cm X -{'>'} 1000mm O</Strong>)
        </CautionItem>
      </CautionMenu>
    </CautionBase>
  );
};

export default Caution;

const CautionBase = styled.section`
  margin-top: 30px;
`;

const CautionTitle = styled.h5`
  font-size: 19px;
  font-weight: 500;
  color: red;
`;

const CautionMenu = styled.ul`
  background-color: #fff;
  margin-top: 10px;
  padding: 15px 10px;
`;

const CautionItem = styled.li`
  line-height: 1.6;
  font-size: 17px;
  &:last-child {
    margin-bottom: 0;
  }
`;

const Strong = styled.strong`
  color: red;
`;
