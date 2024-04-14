import React from "react";
import BottomNavigation from "./components/BottomNavigation";
import { Route, Routes, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import ScrollToTop from "./components/ScrollToTop";

import Home from './pages/Home';
import Vote from './pages/home/Vote';

import Profile from './pages/Profile';

import Cardlist from './pages/Cardlist';
import History from './pages/History';
import Register from './pages/Register';
import Statistics from './pages/Statistics';

import Feedback from "./pages/profile/Feedback";
import Advertising from "./pages/profile/Advertising";
import PrivacyTerms from "./pages/profile/PrivacyTerms";
import ServiceTerms from "./pages/profile/ServiceTerms";

// import RouteChangeTracker from "./components/RouteChangeTracker";
import { AuthProvider } from './components/AuthContext';

function App() {

    // RouteChangeTracker();

    const location = useLocation();

    var isMain = false;

    /**
     * 1. / : 투표
     * 2. profile : 마이페이지
     * 3. cardlist : 카드목록
     * 4. history : 카드이용내역
     * 5. statistics : 상테크통계
     * 6. register : 카드등록
     */

    if(location.pathname === '/'
        || location.pathname === ''
        || location.pathname === '/profile'
        || location.pathname === '/cardlist'
        || location.pathname === '/history'
        || location.pathname === '/statistics'
        || location.pathname === '/register'
    ){
        isMain = true;
    }

    const Background = styled.div`
    background-color: white;
  `;

    const Container = styled.div`
    max-width: 480px;
    margin-left: auto;
    margin-right: auto;
    box-shadow: 0px 0px 24px 0px rgba(0, 0, 0, 0.16);
  `;

    return (
        <AuthProvider>
            <Background>
                <Container>
                    <div>
                        <ScrollToTop />
                        <Routes>

                            {/** 1. / : 투표*/}
                            {/** 2. profile : 마이페이지*/}
                            {/** 3. cardlist : 카드목록*/}
                            {/** 4. history : 카드이용내역*/}
                            {/** 5. statistics : 상테크통계*/}
                            {/** 6. register : 카드등록*/}

                            <Route path="/" element={<Home />} />

                            <Route path="/vote/:vote_id" element={<Vote />} />
                            <Route path="/profile" element={<Profile />} />
                            <Route path="/feedback" element={<Feedback />} />
                            <Route path="/advertising" element={<Advertising />} />
                            <Route path="/privacy-terms" element={<PrivacyTerms />} />
                            <Route path="/service-temrs" element={<ServiceTerms />} />

                            <Route path="/cardlist" element={<Cardlist />} />
                            <Route path="/history" element={<History />} />
                            <Route path="/statistics" element={<Statistics />} />
                            <Route path="/register" element={<Register />} />

                        </Routes>
                    </div>
                    {isMain && <BottomNavigation />}
                </Container>
            </Background>
        </AuthProvider>
    );
}

export default App;