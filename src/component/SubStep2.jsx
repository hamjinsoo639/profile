import { useCallback } from 'react';
import styled from 'styled-components';
import H2 from './Common/H2';

const SubStep2 = props => {
  const {
    tabOptions,
    tabPrice,
    holeOptions,
    holePrice,
    angleOptions,
    anglePrice,
    subOrders,
    setSubOrders,
    handleAddToSheet,
    selectOrders,
    setSelectOrders,
  } = props;

  const toggleOption = useCallback(
    option => {
      setSelectOrders(prev => {
        const newOrders = prev.includes(option)
          ? prev.filter(item => item !== option)
          : [...prev, option];

        setSubOrders(prevSubOrders => ({
          ...prevSubOrders,
          [option]: prev.includes(option) ? (option === 'hole' ? [] : '') : prevSubOrders[option],
        }));

        return newOrders;
      });
    },
    [setSubOrders],
  );

  return (
    <SubStep2Base>
      <SubContents>
        <H2>2-1. 가공옵션을 선택해주세요.</H2>
        <SubP>
          ※ 프로파일 절단만 필요하시면 가공 옵션은 선택 안 하셔도 됩니다.(필요시에만 선택해주세요)
        </SubP>

        <SubMenu>
          <SubItem onClick={() => toggleOption('tab')} isSelected={selectOrders.includes('tab')}>
            탭가공
          </SubItem>
          <SubItem onClick={() => toggleOption('hole')} isSelected={selectOrders.includes('hole')}>
            홀가공
          </SubItem>
          <SubItem
            onClick={() => toggleOption('angle')}
            isSelected={selectOrders.includes('angle')}
          >
            45도 각도절단
          </SubItem>
        </SubMenu>

        <OptionMenu>
          {/* 모든 옵션이 해제되었을 때 */}
          {selectOrders.length === 0 && <NoneOption>선택된 가공옵션이 없습니다.</NoneOption>}

          {/* 탭가공 선택 시 표시 */}
          {selectOrders.includes('tab') && (
            <OptionItem>
              <ItemH4>탭가공</ItemH4>
              <OptionRow>
                <ItemButton
                  onClick={() =>
                    window.open('/images/tap.webp', '_blank', 'width=600,height=600')
                  }
                >
                  사진보기
                </ItemButton>
                <ItemSpan>상세옵션</ItemSpan>
                <SubSelect
                  onChange={e => {
                    const selectedOption = tabOptions.find(tab => tab.value === e.target.value);

                    setSubOrders(prev => ({
                      ...prev,
                      tab: {
                        ...subOrders.tab,
                        value: e.target.value,
                        price: selectedOption ? selectedOption.price : '',
                      },
                    }));
                  }}
                >
                  <Option value="" disabled selected hidden>
                    선택
                  </Option>
                  {tabOptions.map(tab => (
                    <Option key={tab.id} value={tab.value}>
                      {tab.value}
                    </Option>
                  ))}
                </SubSelect>
                <OptionInput
                  onChange={e => {
                    const value = e.target.value;

                    if (isNaN(value) || value.trim() === '') return;

                    setSubOrders(prev => ({
                      ...prev,
                      tab: {
                        ...prev.tab,
                        amount: Number(value),
                      },
                    }));
                  }}
                  placeholder="수량입력"
                />
                <FreeSpan>{tabPrice}원</FreeSpan>
              </OptionRow>
            </OptionItem>
          )}

          {/* 홀가공 선택 시 표시 */}
          {selectOrders.includes('hole') && (
            <OptionItem style={{ paddingTop: '20px' }}>
              <ItemH4>홀가공</ItemH4>
              <OptionRow>
                <ItemButton
                  onClick={() =>
                    window.open('/images/hole.webp', '_blank', 'width=600,height=600')
                  }
                >
                  사진보기
                </ItemButton>
                <ItemSpan>상세옵션</ItemSpan>
                <SubSelect
                  onChange={e => {
                    const selectedOption = holeOptions.find(hole => hole.value === e.target.value);

                    setSubOrders(prev => ({
                      ...prev,
                      hole: {
                        ...subOrders.hole,
                        value: e.target.value,
                        price: selectedOption ? selectedOption.price : '',
                      },
                    }));
                  }}
                >
                  <Option value="" disabled selected hidden>
                    선택
                  </Option>
                  {holeOptions.map(hole => (
                    <Option key={hole.id} value={hole.value}>
                      {hole.value}
                    </Option>
                  ))}
                </SubSelect>
                <OptionInput
                  onChange={e => {
                    const value = e.target.value;

                    if (isNaN(value) || value.trim() === '') return;

                    setSubOrders(prev => ({
                      ...prev,
                      hole: {
                        ...prev.hole,
                        amount: Number(value),
                      },
                    }));
                  }}
                  placeholder="수량입력"
                />
                <FreeSpan>{holePrice}원</FreeSpan>
              </OptionRow>
              <OptionDescription>
                * 홀가공 위치는 왼쪽을 기준으로 진행되며, 타공 중앙점 기준으로 입력하세요.
              </OptionDescription>
              <OptionDescription>
                 여러면 타공이 필요한 경우에는 고객센터(031-997-6072)로 연락주세요.
              </OptionDescription>
            </OptionItem>
          )}

          {/* 45도 가공 선택 시 표시 */}
          {selectOrders.includes('angle') && (
            <OptionItem>
              <ItemH4>45도 가공</ItemH4>
              <OptionRow>
              <ItemButton
                  onClick={() =>
                    window.open('/images/cutting.webp', '_blank', 'width=600,height=600')
                  }
                >
                  사진보기
                </ItemButton>

                <ItemSpan>상세옵션</ItemSpan>
                <SubSelect
                  onChange={e => {
                    const selectedOption = angleOptions.find(
                      angle => angle.value === e.target.value,
                    );

                    setSubOrders(prev => ({
                      ...prev,
                      angle: {
                        ...subOrders.angle,
                        value: e.target.value,
                        price: selectedOption ? selectedOption.price : '',
                      },
                    }));
                  }}
                >
                  <Option value="" disabled selected hidden>
                    선택
                  </Option>
                  {angleOptions.map(angle => (
                    <Option key={angle.id} value={angle.value}>
                      {angle.value}
                    </Option>
                  ))}
                </SubSelect>
                <OptionInput
                  onChange={e => {
                    const value = e.target.value;

                    if (isNaN(value) || value.trim() === '') return;

                    setSubOrders(prev => ({
                      ...prev,
                      angle: {
                        ...prev.angle,
                        amount: Number(value),
                      },
                    }));
                  }}
                  placeholder="수량입력"
                />
                <FreeSpan>{anglePrice}원</FreeSpan>
              </OptionRow>
            </OptionItem>
          )}
        </OptionMenu>

        <ButtonBox>
          <SubmitButton
            onClick={() => {
              handleAddToSheet();
            }}
          >
            제품담기
          </SubmitButton>
        </ButtonBox>
      </SubContents>
    </SubStep2Base>
  );
};

export default SubStep2;

const SubStep2Base = styled.section`
  padding: 30px 0 15px;
  border-bottom: 1px dotted #cbcbcb;
`;

const SubContents = styled.div`
  margin-top: 30px;
`;

const SubP = styled.p`
  font-size: 16px;
  font-weight: 400;
  color: red;
  line-height:25px;
`;

const SubMenu = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  margin-top: 15px;

  @media (max-width: 768px) {
    gap: 10px;
  }
`;

const SubItem = styled.li`
  background: ${({ isSelected }) => (isSelected ? '#555' : '#fff')};
  color: ${({ isSelected }) => (isSelected ? '#fff' : '#000')};
  flex: 1 1 calc(20% - 12px);
  min-width: 100px;
  max-width: 185px;
  height: 40px;
  padding: 6px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  cursor: pointer;
  font-size: 16px;
  border-radius: 3px !important;
  border: 1px solid #cbcbcb;

  @media (max-width: 768px) {
    flex: 1 1 calc(50% - 5px);
    max-width: none;
  }
`;

const OptionMenu = styled.ul`
  margin-top: 15px;
`;

const NoneOption = styled.li`
  background: #fff;
  width: 100%;
  height: 100px;
  line-height: 100px;
  font-size: 14px;
  text-align: center;
`;

const OptionItem = styled.li`
  background: #fff;
  position: relative;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  margin-top: 15px;
  border: 1px solid #cbcbcb;
  width: 100%;
  padding: 15px 30px;
  gap: 5px;

  @media (max-width: 768px) {
    padding: 15px;
  }
`;

const ItemH4 = styled.h4`
  font-weight: 600;
  width: 100px;
  height: 30px;
  line-height: 30px;

  @media (max-width: 768px) {
    width: 100%;
    text-align: left;
  }
`;

const OptionRow = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    width: 100%;
    gap: 10px;
  }
`;

const SubSelect = styled.select`
  background: #fff url('/images/sel_arr_down_g.png') no-repeat center right 5px;
  background-size: 15px;
  width: 300px;
  height: 30px;
  line-height: 30px;
  padding: 0 10px;
  font-size: 16px;
  color: #333;
  border: 1px solid #cbcbcb;
  border-radius: 5px;
  appearance: none;

  @media (max-width: 768px) {
    width: 100%;
    flex: 1;
  }
`;

const Option = styled.option``;


const OptionDescription = styled.p`
  width: 100%;
  font-size: 14px;
  color: #666;
  margin-top: 5px;
  line-height: 25px;
  // border: 1px solid black;
`;

const OptionInput = styled.input`
  width: 80px;
  height: 30px;
  line-height: 30px;
  margin-right: 4px;
  padding: 0 10px;
  font-size: 15px;
  border: 1px solid #cbcbcb;
  border-radius: 5px;
  text-align: center;

  @media (max-width: 768px) {
    width: 100px;
  }
`;

const ItemButton = styled.button`
  background: #eee;
  width: 70px;
  height: 30px;
  text-align: center;
  font-size: 14px;
  line-height: 30px;
  border-radius: 3px;

  @media (max-width: 768px) {
    width: 80px;
  }
`;

const ItemSpan = styled.span`
  font-weight: 400;
`;

const ItemP = styled.p``;

const FreeSpan = styled.span`
  position: absolute;
  right: 30px;
  font-weight: 400;
  color: red;

  @media (max-width: 768px) {
    position: static;
    margin-left: auto;
  }
`;

const ButtonBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 30px;

  @media (max-width: 768px) {
    padding: 20px;
  }
`;

const SubmitButton = styled.button`
  background: #2e427b;
  width: 150px;
  height: 50px;
  text-align: center;
  border: none;
  border-radius: 5px;
  color: #fff;
  font-size: 16px;
  font-weight: 500;

  @media (max-width: 768px) {
    width: 100%;
    max-width: 200px;
  }
`;
