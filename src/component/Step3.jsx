import { useState, useMemo } from 'react';
import styled from 'styled-components';
import H2 from './Common/H2';

const Step3 = props => {
  const { sheet, setSheet, totalEstimatePrice, totalPayment, totalQuantity } = props;
  const [checkedItems, setCheckedItems] = useState([]);

  const handleCheck = key => {
    setCheckedItems(prev => (prev.includes(key) ? prev.filter(id => id !== key) : [...prev, key]));
  };

  const handleDeleteSelected = () => {
    setSheet(prev => prev.filter((_, index) => !checkedItems.includes(index)));
    setCheckedItems([]);
  };

  const handleDeleteAll = () => {
    setSheet([]);
    setCheckedItems([]);
  };

  return (
    <Step3Base>
      <H2>3. 주문하실 견적서를 확인한 뒤 판매자에게 전송해주세요.</H2>

      <TableWrapper>
        <Table>
          {/* 컬럼 너비 유지 */}
          <colgroup>
            <col width="5%" />
            <col width="10%" />
            <col width="10%" />
            <col width="10%" />
            <col width="8%" />
            <col width="12%" />
            <col width="24%" />
            <col width="10%" />
            <col width="11%" />
          </colgroup>

          {/* 테이블 헤더 */}
          <thead>
            <tr>
              <th></th>
              <th>제품명</th>
              <th>색상</th>
              <th>길이</th>
              <th>수량</th>
              <th>금액</th>
              <th>가공옵션</th>
              <th>가공금액</th>
              <th>총금액</th>
            </tr>
          </thead>

          {/* 테이블 본문 */}
          <tbody>
            {sheet.map((item, key) => {
              return (
                <tr key={key}>
                  <td>
                    <input
                      type="checkbox"
                      checked={checkedItems.includes(key)}
                      onChange={() => handleCheck(key)}
                    />
                  </td>
                  <td>{item.product}</td>
                  <td>실버</td>
                  <td>{`${item.length}mm`}</td>
                  <td>{item.amount}개</td>
                  <td>{item.productPrice.toLocaleString()}원</td>
                  <td>
                    {item.tab.value !== '' && `* 탭가공: ${item.tab.value} / ${item.tab.amount}개`}
                    {item.hole.value !== '' &&
                      `* 홀가공: ${item.hole.value} / ${item.hole.amount}개`}
                    {item.angle.value !== '' &&
                      `* 45도각도 절단: ${item.angle.value} / ${item.angle.amount}개`}
                  </td>
                  <td>{(item.tabPrice + item.anglePrice + item.holePrice).toLocaleString()}원</td>
                  <td>
                    {(
                      item.productPrice +
                      item.tabPrice +
                      item.anglePrice +
                      item.holePrice
                    ).toLocaleString()}{' '}
                    원
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </TableWrapper>

      {/* 삭제 버튼 */}
      <DeleteContainer>
        <Button onClick={handleDeleteSelected}>선택삭제</Button>
        <Button onClick={handleDeleteAll}>전체삭제</Button>
      </DeleteContainer>

      <TotalItemContainer>
        <H3Title>
          <IconBox>
            <Icon src="/images/naver-icon.png" alt="title" />
          </IconBox>
          <H3>네이버 결제 금액 안내</H3>
        </H3Title>
        <TotalContainer>
          <TotalBox>
            <InfoMenu>
              <InfoItem>
                네이버에서 100원단위 (길이구간 50mm) 선택 후 (네이버 결제 수량) 동일하게 입력하여
                구매하시면 됩니다.
              </InfoItem>
              <InfoItem>자동견적 계산기는 프로파일 및 가공만 계산되는 금액입니다.</InfoItem>
              <InfoItem>
                프로파일 부품은 프로파일 구매금액 별도로 네이버 추가 상품에서 선택 구매하시면
                됩니다.
              </InfoItem>
            </InfoMenu>
          </TotalBox>
          <TotalBox>
            <TotalMenu>
              <TotalItem>
                <TotalH4 style={{ color: 'black', fontSize: '18px', fontWeight: '500' }}>
                  총 견적금액
                </TotalH4>

                <Total>{totalEstimatePrice.toLocaleString()}원</Total>
              </TotalItem>
              <TotalItem>
                <TotalH4 style={{ color: 'black', fontWeight: '800' }}>총 결제금액</TotalH4>

                <Total>
                  <StrongSpan>{totalPayment.toLocaleString()}원</StrongSpan>
                </Total>
              </TotalItem>
              <TotalItem>
                <TotalH4>
                  <StrongSpan>네이버</StrongSpan> 백원 <StrongSpan>단위 결제 수량</StrongSpan>
                </TotalH4>
                <Total>
                  <StrongSpan>{totalQuantity.toLocaleString()}개</StrongSpan>
                </Total>
              </TotalItem>
            </TotalMenu>
            <CautionP>*결제 수량을 꼭 확인해주세요!</CautionP>
          </TotalBox>
        </TotalContainer>
      </TotalItemContainer>
    </Step3Base>
  );
};

export default Step3;

const Step3Base = styled.section`
  padding: 30px 0;
  border-bottom: 1px dotted #cbcbcb;
`;

const TableWrapper = styled.div`
  width: 100%;
  min-height: 200px;
  max-height: 250px;
  overflow-y: auto;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  table-layout: fixed;
  position: relative;

  thead {
    position: sticky;
    top: 0;
    background: #d9e3ff;
    z-index: 2;
  }

  th,
  td {
    font-size: 14px;
    text-align: center;
    vertical-align: middle;
  }

  th {
    padding: 15px 0;
    font-weight: 600;
  }

  td {
    background: #fff;
    padding: 12px 0;
    font-weight: 400;
    line-height: 1.4;
    border-bottom: 1px solid #e4e4e4;
  }

  input[type='checkbox'] {
    width: 16px;
    height: 16px;
    cursor: pointer;
    vertical-align: middle;
    border: 2px solid #4d5058;
    border-radius: 3px;
    background-color: white;
    appearance: auto;
  }
`;

const DeleteContainer = styled.div`
  background-color: #555;
  display: flex;
  justify-content: flex-start;
  gap: 10px;
  padding: 10px 15px;
`;

const Button = styled.button`
  background: #fff;
  border-radius: 3px;
  padding: 8px 15px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    background: #eee;
  }
`;

const TotalItemContainer = styled.div`
  background: #fff;
  border: 1px solid #2e427b;
  margin-top: 15px;
  gap: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const H3Title = styled.div`
  background: #00de5a;
  height: 50px;
  display: flex;
  align-items: center;
  padding-left: 16px;
`;

const IconBox = styled.div`
  width: 30px;
  height: 30px;
`;

const Icon = styled.img`
  display: block;
  width: 100%;
  height: 100%;
`;

const H3 = styled.h3`
  margin-left: 4px;
  font-size: 20px;
  font-weight: 800;
  color: black;
`;

const TotalContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 20px 15px 15px;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const TotalBox = styled.div`
  &:first-child {
    flex: 0 0 60%;
  }

  &:last-child {
    flex: 0 0 38%;
  }
  @media (max-width: 768px) {
    &:last-child {
      margin-top: 16px;
    }
  }
`;

const InfoMenu = styled.ul`
  list-style-type: none;
  padding-left: 15px;
`;

const InfoItem = styled.li`
  position: relative;
  display: flex;
  flex-wrap: wrap;
  margin-top: 5px;
  padding-left: 5px;
  font-size: 16px;
  line-height: 1.4;
  &::before {
    content: '●';
    position: absolute;
    top: 7px;
    left: -10px;
    color: black;
    font-size: 8px;
  }
`;

const TotalMenu = styled.ul``;

const TotalItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px;
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 5px;
  &:first-child {
    // padding-top: 0;
    border-bottom: 2px dashed #c8c8c8;
  }
`;

const TotalH4 = styled.h4``;

const StrongSpan = styled.strong`
  color: #1a7bde;
`;

const Total = styled.div`
  color: black;
`;

const CautionP = styled.p`
  font-size: 14px;
  text-align: right;
  color: red;
  text-decoration: underline;
  font-weight: 600;
`;
