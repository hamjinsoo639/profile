import { useState } from 'react';
import styled from 'styled-components';
import Caution from './Caution';
import Agree from './Common/Agree';

const Step4 = ({ agree, setAgree, setCustomerInfo }) => {
  const [openModal, setOpenModal] = useState(false);
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
          onClick={() => {
            setOpenModal(true);
          }}
        >
          전문보기
        </AgreeBtn>
      </AgreeContents>
      {openModal && (
        <Agree
          onCloseModal={() => {
            setOpenModal(false);
          }}
        />
      )}
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

