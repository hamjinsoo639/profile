import styled from 'styled-components';
import H2 from './Common/H2';

const Step2 = props => {
  const { productPrice, orders, setOrders } = props;
  return (
    <Step2Base>
      <H2>2. 선택하신 프로파일의 길이를 입력해주세요.</H2>
      <Contents>
        <ImgBox>
          <Img src={`/images/${orders.product}.webp`} alt="아크릴" />
        </ImgBox>

        <SizeMenu>
          {/* 색상 */}
          <SizeItem>
            <span>색상</span>
            <SelectR value="실버">
              <Option value="실버" disabled hidden>
                실버
              </Option>
            </SelectR>
          </SizeItem>
          {/* 길이 */}
          <SizeItem>
            <span>길이</span>
            <Input
              type="number"
              value={orders.length}
              onChange={e => {
                setOrders(prev => ({
                  ...prev,
                  length: e.target.value,
                }));
              }}
            />
            <span>mm</span>
          </SizeItem>

          {/* 수량 */}
          <SizeItem>
            <span>수량</span>
            <Input
              type="number"
              value={orders.amount}
              onChange={e => {
                setOrders(prev => ({
                  ...prev,
                  amount: e.target.value,
                }));
              }}
            />
            <span>EA</span>
          </SizeItem>

          {/* 금액 */}
          <SizeItem>
            <span style={{ color: 'red' }}>금액</span>
            <Input readOnly value={productPrice} />
            <span style={{ color: 'red' }}>원</span>
          </SizeItem>
        </SizeMenu>
      </Contents>
    </Step2Base>
  );
};

export default Step2;

const Step2Base = styled.section`
  padding: 30px 0 0;
`;

const Contents = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const ImgBox = styled.div`
  flex: 1;
  display: flex;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const Img = styled.img`
  display: block;
  width: 320px;
  height: 320px;
  object-fit: cover;

  @media (max-width: 768px) {
    width: 100%;
    max-width: 500px;
    height: auto;
  }
`;

const SizeMenu = styled.ul`
  flex: 1;
  padding: 0px 15px 0px 30px;

  @media (max-width: 768px) {
    width: 100%;
    padding: 15px 0;
  }
`;

const SizeItem = styled.li`
  border-bottom: 1px solid #ddd;
  padding: 10.5px 0px;
  font-size: 16px;

  select {
    width: 125px;
    padding: 0 10px;
    height: 30px;
    line-height: 30px;
    font-size: 16px;
    border: 1px solid #cbcbcb;
    color: #252525;
    border-radius: 5px;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    outline: none;
  }

  span {
    display: inline-block;
    color: #4d5058;
    font-weight: bold;

    &:first-child {
      width: 90px;
    }
    &:last-child {
      width: 50px;
      margin-left: 4px;
    }
  }
`;

const SelectR = styled.select`
  background: #fff url('/images/sel_arr_down_g.png') no-repeat center left 5px;
  background-size: 15px;
  width: 125px;
  text-align: right;
  direction: rtl;
`;

const Option = styled.option`
  font-weight: normal;
  display: block;
  padding-block-start: 0px;
  padding-block-end: 1px;
  min-block-size: 1.2em;
  padding-inline: 2px;
  white-space: nowrap;
`;

const Input = styled.input`
  background-color: #fff;
  width: 125px;
  text-align: right;
  padding: 0 10px;
  height: 30px;
  line-height: 30px;
  border: 1px solid #cbcbcb;
  color: #252525;
  font-size: 18px;
  border-radius: 5px;
  appearance: none;
  -webkit-appearance: none;
  outline: none;
`;
