import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';

const Agree = props => {
  const { onCloseModal } = props;

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  const outside = useRef | (null > null);
  const handleOutside = e => {
    if (outside.current && !outside.current.contains(e.target)) {
      onCloseModal?.();
    }
  };
  useEffect(() => {
    document.addEventListener('mousedown', handleOutside);
    return () => {
      document.removeEventListener('mousedown', handleOutside);
    };
  });

  return (
    <ModalBase>
      <ModalInner ref={outside}>
        <AgreeBase>
          <AgreeH1>개인정보 수집 이용동의 (필수)</AgreeH1>
          <AgreeBox>
            {'<'}개인정보 수집 및 이용에 대한 안내 - 개인정보 보호법 제 15조 2항{'>'}
          </AgreeBox>

          <AgreeH3>개인정보동의 수집 및 이용</AgreeH3>
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
          <CloseBtn onClick={onCloseModal}>닫기</CloseBtn>
        </AgreeBase>
      </ModalInner>
    </ModalBase>
  );
};

export default Agree;

const ModalBase = styled.div`
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.7);
  padding: 16px;
  z-index: 999999;
`;

const ModalInner = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #fff;
  width: 500px;
  max-height: 600px;
  overflow-y: auto;
  border-radius: 5px;
  z-index: 1000000;

  @media (max-width: 768px) {
    width: 90%;
    max-height: 80vh;
  }
`;

const AgreeBase = styled.main`
  height: 100%;
  padding: 24px 16px;
  line-height: 1.6;
`;

const AgreeH1 = styled.h1`
  font-size: 24px;
  font-weight: 600;
`;

const AgreeBox = styled.div`
  background-color: rgb(242, 244, 247);
  padding: 12px 0;
  border-radius: 8px;
  text-align: center;
  font-size:12px;
`;

const AgreeH3 = styled.h3`
  font-size: 17px;
  font-weight: 700;
  margin-top: 7px;
`;

const AgreeMenu = styled.ul`
  margin-top: 7px;
`;

const AgreeItem = styled.li`
  margin-bottom: 16px;
`;

const AgreeH4 = styled.h4``;
const AgreeP = styled.p``;

const CloseBtn = styled.button`
  background-color: rgb(63, 106, 167);
  width: 100%;
  height: 50px;
  border-radius: 5px;
  color: #fff;
  font-size: 16px;
  margin-bottom: 16px;
`;
