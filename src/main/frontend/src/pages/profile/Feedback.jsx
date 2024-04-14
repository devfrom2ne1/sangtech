import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import colors from '../../assets/colors';
import apiUrl from '../../assets/apiUrl';
import HeaderBackButton from '../../components/HeaderBackButton';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../components/AuthContext';

const Feedback = () => {

    const navigate = useNavigate();
    const { isLoggedIn, userData, updateUserData } = useAuth();
  
    const Container = styled.nav` 
        height: 100vh;
    `;

    const ButtonContainer = styled.div`
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        max-width: 480px;
        margin-left: auto;
        margin-right: auto;
        padding-bottom: 16px;
        height: 48px;
        background-color: white;
        display: flex;
        align-items: center;
        justify-content: space-between;
    `;

    const handleClickSend = () => {
        const title = document.getElementsByName('title')[0].value;
        const description = document.getElementById('description').value;

        if(userData === null){
            alert('로그인이 필요합니다.');
            navigate('/profile');
        } else if(title === '' || description === ''){
            alert('제목과 내용을 입력해주세요 :)');
        } else {
            const text = '(1) 제목 : ' + title + ', (2) 내용 : ' + description;
            addUserFeedback(userData.user_id, text, '토론주제/기능/오류 제보');
        }
    };

    const addUserFeedback = async (user_id, text, type) => {

        const formData = {
            user_id: user_id,
            text: text,
            type: type,
        };

        try {
            const response = await fetch(`${apiUrl}/api/left-right/user/feedback/add`, {
                method: "POST", // POST 메서드 사용
                headers: {
                    "Content-Type": "application/json" // JSON 데이터를 전송할 경우 헤더에 Content-Type 설정
                    // 추가로 필요한 헤더가 있다면 여기에 추가
                },
                body: JSON.stringify(formData) // 객체를 JSON 문자열로 변환하여 body에 설정
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            alert('의견 감사합니다 :) 빠른 시일 내에 반영하도록 하겠습니다.');
            navigate('/profile');
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Container>
            <HeaderBackButton title="토론주제/기능/오류 제보" backUrl="/profile" />
            <div style={styles.contentDiv}>
                <input
                    name="title"
                    type="text"
                    placeholder="[필수] 제목을 입력해주세요"
                    style={styles.input}
                />
                <textarea
                    id="description"
                    name="description"
                    type="text"
                    placeholder="[필수]내용을 입력해주세요"
                    style={styles.textArea}
                    rows={6} // 표시할 행의 수
                />
            </div>
            <ButtonContainer>
                <div style={{ ...styles.buttonDiv }} onClick={() => handleClickSend()} >
                    <div style={{ ...styles.button, ...styles.row }} >
                        <div style={{ ...styles.buttonText }}>제보하기</div>
                    </div>
                </div>
            </ButtonContainer>
        </Container>
    );
};

const styles = {
    contentDiv: {
        display: 'flex',
        flexDirection: 'column',
        paddingTop: 80,
        paddingLeft: 20,
        paddingRight: 20,
    },
    input: {
        height: 45,
        paddingLeft: 16,
        paddingRight: 16,
        borderRadius: 4,
        borderWidth: 1, // 테두리 두께
        borderStyle: 'solid', // 테두리 스타일
        borderColor: colors.black100, // 테두리 색상
        marginBottom: 12,
        fontSize: 14,
    },
    textArea: {
        resize: 'none',
        paddingTop: 12,
        paddingLeft: 16,
        paddingRight: 16,
        borderRadius: 4,
        borderWidth: 1, // 테두리 두께
        borderStyle: 'solid', // 테두리 스타일
        borderColor: colors.black100, // 테두리 색상
        fontSize: 14,
    },
    buttonDiv: {
        width: '100%',
        height: '100%',
        paddingLeft: 20,
        paddingRight: 20,
    },
    button: {
        height: '100%', // 버튼 영역의 높이를 꽉 차게 설정
        borderRadius: 12,
        justifyContent: 'center',
        cursor: 'pointer',
        backgroundColor: colors.black600,
    },
    buttonText: {
        fontSize: 16,
        fontWeight: 500,
        color: 'white',
    },
    row: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
};

export default Feedback;