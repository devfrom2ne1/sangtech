import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { FaChevronLeft } from 'react-icons/fa'; // 뒤로 가기 아이콘

const HeaderContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  max-width: 480px;
  margin-left: auto;
  margin-right: auto;
  height: 50px;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid var(--gray-300, #EAEAEA);
  z-index: 999;
`;

const Title = styled.h1`
  color: #363230;
  font-size: 16px;
  font-weight: 400;
`;

const HeaderBackButton = ({ title, backUrl }) => {
  const navigate = useNavigate();

  const handleBackButtonClick = () => {
    if(backUrl === null) {
      navigate(-1);
    } else {
      navigate(backUrl);
    }
  };

  return (
    <HeaderContainer>
      <div style={styles.buttonDiv} onClick={() => handleBackButtonClick()} >
        <FaChevronLeft />
      </div>
      <Title>{title}</Title>
      {/* 추가적인 헤더 컨텐츠가 필요하다면 여기에 추가 */}
      <div style={styles.buttonDiv}>
        <FaChevronLeft style={{ color: 'white' }} />
      </div>
    </HeaderContainer>
  );
};

const styles = {
  buttonDiv: {
    marginLeft: 10,
    marginRight: 10,
    fontSize: 20,
    cursor: 'pointer',
  },
};

export default HeaderBackButton;
