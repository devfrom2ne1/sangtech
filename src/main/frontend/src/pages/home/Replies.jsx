import React, { useState, useEffect } from "react";
import styled from 'styled-components';
import colors from '../../assets/colors';
import { FaUser } from 'react-icons/fa'; 
import { useNavigate } from 'react-router-dom';
import apiUrl from '../../assets/apiUrl';
import { useAuth } from '../../components/AuthContext';
import HeaderBackButton from '../../components/HeaderBackButton';

const Reviews = () => {

  const navigate = useNavigate();

  const { login, logout, isLoggedIn, userData } = useAuth();

  const voteData = { title: '배현진을 피습한 중학생의\n강제 신변 확보를?', description: '배현진 의원을 피습한 중학생에 대해 적절한 대우와 수사 절차에 대한 의구심 논란. 일부에서는 A군이 중학생이라는 점을 감안하여 강제 조치가 필요하다는 주장이 있지만, A군이 현재 입원 중이라 체포의 의미가 없다는 주장도 있다.', votes_count: 1120, reviews_count: 120, left_argument: '겨우 중학생이다!\n당연히 필요없다!', right_argument: '살인 용의자인데\n무슨 중학생이냐!', left_count: 300, right_count: 920, closed_date: '3일 04:20 남음'};

  const Container = styled.nav` 
    height: 100vh;
  `;

  return (
    <Container>
      <HeaderBackButton backUrl="/" />
      <div>
        
      </div>
    </Container>
  );
};

const styles = {
  row: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  voteImg: {
    width: '100%',
    borderRadius: 12,
  },
};

export default Reviews;