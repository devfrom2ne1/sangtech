import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
    const [message, setMessage] = useState("");

    useEffect(() => {
        fetch('/api/mycard')
            .then(response => response.text())
            .then(message => {
                setMessage(message);
            });
    }, []);

    return (
        <div className="app">
            <header className="header">
                <h1>형빈이와 함께하는 즐거운 상테크</h1>
            </header>
            <main className="main" style={{ height: '85vh' }}>
                <section className="content">
                    {/* 여기에 컨텐츠를 추가하세요 */}
                    <p>여기에 내용이 쫚쫙 들어갈 예정!</p>
                    api통신내역 : {message}
                    아니 근데 바뀐거야 만거야?
                </section>
            </main>
            <div className="floating-button">
                <button className="add-button">+</button>
            </div>
            <footer className="footer">
                <nav className="navbar">
                    <a href="#" className="nav-link">카드선택</a>
                    <a href="#" className="nav-link">구입기록</a>
                    <a href="#" className="nav-link">나의통계</a>
                    <a href="#" className="nav-link">카드등록</a>
                </nav>
            </footer>
        </div>
    );
}

export default App;
