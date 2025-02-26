import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Loading from './Common/Loading';

const TableToPDF = props => {
  const { agree, sheet, customerInfo, totalPayment, totalQuantity } = props;
  const [loading, setLoading] = useState(false);

  const handleSendEmail = async () => {
    if (Object.values(customerInfo).some(value => value === '')) {
      alert('작성하지 않은 수취인 정보가 있습니다.');
      return null;
    }
    if (!agree) {
      alert('개인정보 취급방침에 동의해주세요.');
      return null;
    }

    try {
      setLoading(true);
      const response = await axios.post(
        '/api/send-email',
        {
          email: customerInfo.email,
          title: `견적서_${customerInfo.name}_${new Date().toISOString().slice(0, 10).replace(/-/g, '')}`,
          sheet: sheet,
          customerInfo: customerInfo,
          totalPayment: totalPayment,
          totalQuantity: totalQuantity,
        },
        {
          headers: { 'Content-Type': 'application/json' },
        },
      );

      if (response.status === 200) {
        alert('이메일이 성공적으로 전송되었습니다!');
        window.location.reload();
        return;
      } else {
        return alert('오류가 발생하였습니다. 다시 시도해주세요.');
      }
    } catch (error) {
      alert(`오류 발생: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <PDFBase>
      {loading && <Loading loading={loading} />}
      <SubmitBtnBox>
        <SubmitBtn onClick={handleSendEmail}>판매자에게 견적전송하기</SubmitBtn>
      </SubmitBtnBox>
      <BtnBox>
          <GoToTalkTalk
            onClick={() => {
              window.open('https://talk.naver.com/ct/wchaw2?frm=pss#nafullscreen');
            }}
          >
            <NaverIcon src="/images/talk.jpg" alt="icon" />
            네이버 톡톡 문의하기
          </GoToTalkTalk>
          <GoToKakao
            onClick={() => {
              window.open('http://pf.kakao.com/_qlhZj/chat');
            }}
          >
            <KakaoIcon src="/images/kakao.png" alt="icon" />
            카카오톡 채널 문의하기
          </GoToKakao>
        </BtnBox>
    </PDFBase>
    
  );
};

export default TableToPDF;

const PDFBase = styled.div`
  margin-top: 30px;
  padding: 0 0 50px;
`;

const SubmitBtnBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SubmitBtn = styled.button`
  background: rgb(5, 117, 112);
  color: #fff;
  text-align: center;
  padding: 17px 25px;
  font-size: 17px;
  font-weight: 500;
  border-radius: 5px;
`;

const BtnBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  flex-wrap: wrap;
  margin-top: 16px;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const GoToTalkTalk = styled.button`
  background-color: #00c63b;
  width: 30%;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 30px;
  color: #fff;
  font-size: 16px;
  font-weight: 600;
  box-shadow: 5px 5px 5px -3px #333;
  @media (max-width: 768px) {
    width: 80%;
    margin-top: 0px;
  }
`;

const GoToKakao = styled(GoToTalkTalk)`
  background-color: #f9e000;
  @media (max-width: 768px) {
    margin-top: 24px;
  }
`;

const NaverIcon = styled.img`
  display: block;
  width: 40px;
  height: 40px;
`;

const KakaoIcon = styled(NaverIcon)`
  width: 50px;
  height: 50px;
`;
