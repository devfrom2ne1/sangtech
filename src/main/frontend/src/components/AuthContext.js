// AuthContext.js
import React, { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // 로컬 스토리지에서 사용자 데이터 가져오기
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    
    if (isLoggedIn === 'true') {
      const storedUserData = localStorage.getItem('userData');
      setUserData(JSON.parse(storedUserData));
      setIsLoggedIn(true);
    }
  }, []);

  const login = (userData) => {
    setUserData(userData);
    setIsLoggedIn(true);

    // 로그인 상태와 사용자 데이터를 로컬 스토리지에 저장
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('userData', JSON.stringify(userData));
  };

  const logout = () => {
    setUserData(null);
    setIsLoggedIn(false);

    // 로그인 상태와 사용자 데이터를 로컬 스토리지에서 제거
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userData');
  };

  const updateUserData = (updatedData) => {
    setUserData(updatedData);

    // 수정된 사용자 데이터를 로컬 스토리지에 저장
    localStorage.setItem('userData', JSON.stringify(updatedData));
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, userData, login, logout, updateUserData }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
