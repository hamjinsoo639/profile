import { useEffect } from 'react';
import { ClipLoader } from 'react-spinners';
import styled from 'styled-components';

const Loading = ({ loading }) => {
  useEffect(() => {
    // 외부화면 스크롤방지
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <LoadingBase>
      <LoadingInner>
        <ClipLoader color="#3a70ee" loading={loading} size={80} />
        <LoadingP>잠시만 기다려 주세요. 메일을 발송 중입니다.</LoadingP>
        <LoadingSpan>(최대 1~2분 소요)</LoadingSpan>
      </LoadingInner>
    </LoadingBase>
  );
};

export default Loading;

const LoadingBase = styled.div`
  background-color: rgba(255, 255, 255, 0.7);
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 16px;
  z-index: 999;
  border: 1px solid black;
`;

const LoadingInner = styled.div`
  max-width: 960px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 50px 0;
  height: calc(var(--vh, 1vh) * 100);
  line-height: 1.6;
`;

const LoadingP = styled.p`
  margin-top: 24px;
  font-weight: 600;
  color: black;
`;

const LoadingSpan = styled.span`
  font-size: 14px;
`;
