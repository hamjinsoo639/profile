import { useState } from 'react';
import styled from 'styled-components';
import Caution from './Caution';
import Agree from './Common/Agree';

const Step4 = ({ agree, setAgree, setCustomerInfo }) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleChange = e => {
    const { name, value } = e.target;
    setCustomerInfo(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <Step4Base>
      <CstInfoContainer>
        <InfoP>※ 주문시 네이버 수취인 성함과 동일하게 작성해주셔야 확인이 가능합니다.</InfoP>

        <CstInfoBox>
          <InfoMenu>
            <InfoList>
              <InfoInput name="name" placeholder="수취인명 (네이버 수취인명 과 동일하게 입력해 주세요)" onChange={handleChange} />
            </InfoList>
            <InfoList>
              <InfoInput
                name="tel"
                type="tel"
                placeholder='수취인 연락처("-"제외하고 숫자만 입력해 주세요.)'
                onChange={handleChange}
              />
            </InfoList>
            <InfoList>
              <InfoInput
                name="email"
                type="email"
                placeholder="수취인 이메일"
                onChange={handleChange}
              />
            </InfoList>
          </InfoMenu>
          <InfoText
            name="remark"
            placeholder="[요청사항] 주문방법과 가공작업 관련된 사항은 네이버톡톡문의 또는 전화문의 주시면 빠른 상담 가능합니다. 탭가공 및 홀가공 상세내용은 여기로 남겨주세요."
            onChange={handleChange}
          />
        </CstInfoBox>


      </CstInfoContainer>
      {/* 주의 */}
      <Caution />
      {/* 동의 */}
      <AgreeContents>
        <CheckBox
          type="checkbox"
          id="agree_chk"
          name="agree_chk"
          onChange={() => {
            setAgree(!agree);
          }}
        />
        <AgreeLabel htmlFor="agree_chk">
          위 사항을 확인했습니다. 개인정보 취급방침에 동의합니다.
        </AgreeLabel>
        <AgreeBtn
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? '닫기' : '전문보기'}
        </AgreeBtn>
      </AgreeContents>
      
      <AccordionContent isOpen={isOpen}>
        <AgreeBase>
          <AgreeH1>개인정보 수집 이용동의 (필수)</AgreeH1>
          <AgreeBox>
            개인정보 수집 및 이용에 대한 안내 <br/>(개인정보 보호법 제 15조 2항)
          </AgreeBox>

          <AgreeMenu>
            <AgreeItem>
              <AgreeH4>1. 개인정보의 수집 이용 목적</AgreeH4>
              <AgreeP>프로파일의 자동 견적 계산 견적서를 제공하기 위한 본인 확인</AgreeP>
            </AgreeItem>
            <AgreeItem>
              <AgreeH4>2. 수집하려는 개인정보</AgreeH4>
              <AgreeP>필수항목: 이름, 연락처, 이메일</AgreeP>
            </AgreeItem>
            <AgreeItem>
              <AgreeH4>3. 개인정보의 보유이용기간</AgreeH4>
              <AgreeP>
                개인정보는 개인정보의 수집목적 또는 제공받은 목적이 소멸되면 파기됩니다.
              </AgreeP>
            </AgreeItem>
            <AgreeItem>
              <AgreeH4>4. 동의를 거부할 권리 및 동의 거부에 따른 불이익 내용</AgreeH4>
              <AgreeP>
                개인정보 수집이용에 동의를 거부할 권리가 있으며, 동의후에도 언제든지 철회
                가능합니다. 다만, 동의를 거부할 경우 프로파일 자동 계산 견적서를 받을 수 없습니다.
              </AgreeP>
            </AgreeItem>
          </AgreeMenu>
        </AgreeBase>
      </AccordionContent>
    </Step4Base>
  );
};

export default Step4;

const Step4Base = styled.section`
  padding: 30px 0;
`;

const CstInfoContainer = styled.div`
  background-color: #fff;
  padding: 20px 15px;
`;

const InfoP = styled.p`
  color: red;
  margin-bottom: 10px;
  line-height: 25px;
`;

const CstInfoBox = styled.div`
  display: flex;
  gap: 15px;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const InfoMenu = styled.ul`
  flex: 1;
`;

const InfoList = styled.li`
  margin-bottom: 10px;

  &:last-child {
    margin: 0 0;
  }
`;

const InfoInput = styled.input`
  background-color: #fff;
  width: 100%;
  padding: 0 10px;
  height: 30px;
  line-height: 30px;
  border: 1px solid #cbcbcb;
  color: #252525;
  font-size: 16px;
  border-radius: 5px;
  appearance: none;
  font-weight: 400;
`;

const InfoText = styled.textarea`
  line-height: 1.2;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #cbcbcb;
  color: #252525;
  border-radius: 5px;
  resize: none;
  width: calc(50% - 7.5px);
  height: 110px;
  line-height: 25px;

  @media (max-width: 768px) {
    width: 100%;
    margin-left: 0;
  }
`;

const AgreeContents = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 35px;
`;

const AgreeLabel = styled.label`
  font-weight: 500;
  color: black;
  display: flex;
  align-items: center;
  line-height:25px;
  
`;

const CheckBox = styled.input`
  width: 14px;
  height: 14px;
  margin-right: 7px;
  cursor: pointer;
  border: 1px solid #4d5058;
  border-radius: 3px;
  appearance: auto;
`;

const AgreeBtn = styled.button`
  background: #555;
  padding: 5px 10px;
  margin-left: 15px;
  color: #fff;
  font-size: 14px;
  border-radius: 3px;
  width:120px;
`;

const AccordionContent = styled.div`
  max-height: ${props => (props.isOpen ? '1000px' : '0')};
  overflow: hidden;
  transition: max-height 0.3s ease-in-out;
  background: #fff;
  margin-top: ${props => (props.isOpen ? '20px' : '0')};
`;

const AgreeBase = styled.main`
  padding: 24px 16px;
  line-height: 1.6;
`;

const AgreeH1 = styled.h1`
  font-size: 24px;
  font-weight: 600;
  text-align: center;
  margin-bottom: 15px;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`;

const AgreeBox = styled.div`
  background-color: rgb(242, 244, 247);
  padding: 12px 0;
  border-radius: 8px;
  text-align: center;
  font-size: 14px;
  margin-bottom: 15px;
`;

const AgreeMenu = styled.ul`
  margin-top: 7px;
`;

const AgreeItem = styled.li`
  margin-bottom: 16px;

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

const AgreeH4 = styled.h4`
  margin-bottom: 8px;
`;

const AgreeP = styled.p`
  color: #666;
  line-height: 1.5;
`;

