import React, { useEffect, useState } from "react";
import styled from 'styled-components';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // FontAwesomIcon 컴포넌트를 사용하기 위해 import
import { faCheckToSlot, faUser, faCreditCard , faBagShopping, faMagnifyingGlassChart, faPenToSquare, faPlus} from "@fortawesome/free-solid-svg-icons";
import { useLocation } from 'react-router-dom';
import colors from "../assets/colors";

const BottomNavigation = () => {
  // 현재 선택된 아이콘을 관리하는 state
  const [activeNav, setActiveNav] = useState(1);

  const location = useLocation();
  /**
   * 1. / : 투표
   * 2. profile : 마이페이지
   * 3. cardlist : 카드목록
   * 4. history : 카드이용내역
   * 5. statistics : 상테크통계
   * 6. register : 카드등록
   */
  useEffect(() => {
    if(location.pathname === '/' || location.pathname === ''){
      setActiveNav(1);
    } else if(location.pathname === '/profile' || location.pathname === '/profile/') {
      setActiveNav(2);
    } else if(location.pathname === '/cardlist' || location.pathname === '/cardlist/') {
      setActiveNav(3);
    } else if(location.pathname === '/history' || location.pathname === '/history/') {
      setActiveNav(4);
    } else if(location.pathname === '/statistics' || location.pathname === '/statistics/') {
      setActiveNav(5);
    } else if(location.pathname === '/register' || location.pathname === '/register/') {
      setActiveNav(6);
    }
  }, []);

  /* 네비바 하단 고정 밑 세로 길이 설정 */
  const Wrapper = styled.nav` 
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 60px;
    max-width: 480px;
    margin-left: auto;
    margin-right: auto;
    background-color: white;
    border-top: 1px solid #EAEAEA;
    z-index: 999;
  `;

  /* nav태그 아래의 div태그들을 수평정렬 및 세로길이 설정 */
  const NavLink = styled(Link)` 
    float: left;
    width: 16.666666%;
    text-align: center;

    /* 세로길이 설정 */
    height: 45px;
    line-height: 45px;
  `;

  const navItem = {
    color: colors.black300,
  };

  const navText = {
    color: colors.black300,
    fontSize: 12,
    fontWeight: 400,
    margin: 0,
    lineHeight: 0,
  };

  const navItemActive = {
    color: 'black',
  };

  const navTextActive = {
    color: 'black',
    fontSize: 12,
    fontWeight: 400,
    margin: 0,
    lineHeight: 0,
  };

  // 우측 상단에 빨간색 동그라미 버튼 스타일 추가
  const RedCircleButton = styled.button`
  position: fixed;
  bottom: 80px;
  right: 20px;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: red;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 24px;
  cursor: pointer;
`;




  return (
    <Wrapper>
      {/* 하단 네비게이션 최상위 태그 */}
      <NavLink to="/" style={{ textDecoration: "none" }} onClick={() => setActiveNav(1)}>
        <div>
          <FontAwesomeIcon
            icon={faCheckToSlot}
            style={activeNav === 1 ? navItemActive : navItem}
          />
          {/* 네비게이션을 구성하고 있는 하나의 버튼 */}
          <h6 style={activeNav === 1 ? navTextActive : navText}>투표</h6>
        </div>
      </NavLink>
      <NavLink to="/profile" style={{ textDecoration: "none" }} onClick={() => setActiveNav(2)} >
        <div>
          <FontAwesomeIcon
            icon={faUser}
            style={activeNav === 2 ? navItemActive : navItem}
          />
          <h6 style={activeNav === 2 ? navTextActive : navText}>MY</h6>
        </div>
      </NavLink>
      <NavLink to="/cardlist" style={{ textDecoration: "none" }} onClick={() => setActiveNav(3)} >
        <div>
          <FontAwesomeIcon
            icon={faCreditCard}
            style={activeNav === 3 ? navItemActive : navItem}
          />
          <h6 style={activeNav === 3 ? navTextActive : navText}>카드선택</h6>
        </div>
      </NavLink>
      <NavLink to="/history" style={{ textDecoration: "none" }} onClick={() => setActiveNav(4)} >
        <div>
          <FontAwesomeIcon
            icon={faBagShopping}
            style={activeNav === 4 ? navItemActive : navItem}
          />
          <h6 style={activeNav === 4 ? navTextActive : navText}>구입기록</h6>
        </div>
      </NavLink>
      <NavLink to="/statistics" style={{ textDecoration: "none" }} onClick={() => setActiveNav(5)} >
        <div>
          <FontAwesomeIcon
            icon={faMagnifyingGlassChart}
            style={activeNav === 5 ? navItemActive : navItem}
          />
          <h6 style={activeNav === 5 ? navTextActive : navText}>나의통계</h6>
        </div>
      </NavLink>
      <NavLink to="/register" style={{ textDecoration: "none" }} onClick={() => setActiveNav(6)} >
        <div>
          <FontAwesomeIcon
            icon={faPenToSquare}
            style={activeNav === 6 ? navItemActive : navItem}
          />
          <h6 style={activeNav === 6 ? navTextActive : navText}>카드등록</h6>
        </div>
      </NavLink>

      {/* 우측 상단 빨간색 동그라미 버튼 */}
      <RedCircleButton>
        <FontAwesomeIcon icon={faPlus} />
      </RedCircleButton>
    </Wrapper>
  );
};

export default BottomNavigation;