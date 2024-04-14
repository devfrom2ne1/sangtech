import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import colors from '../../assets/colors';
import apiUrl from '../../assets/apiUrl';
import HeaderBackButton from '../../components/HeaderBackButton';

const PrivacyTerms = () => {

    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        getData();
    }, []);
    
    const getData = async () => {

        const formData = {
            name: '개인정보 처리방침'
        };
    
        try {
            const response = await fetch(`${apiUrl}/api/left-right/admin/name`, {
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
        
            const res = await response.json();
            setData(res.result[0]);
        } catch (error) {
            console.log(error);
        }
    };
  
    const Container = styled.nav` 
        height: 100vh;
    `;

    return (
        <Container>
            {isLoading ? (null) : (
                <div style={styles.scrollContainer}>
                    <HeaderBackButton title="개인정보 처리방침" backUrl="/profile" />
                    {data.value ? (
                        <div
                        style={{ ...styles.text, whiteSpace: 'pre-line' }}
                        dangerouslySetInnerHTML={{ __html: data.value.replace(/\n/g, '<br />') }}
                        />
                    ) : (
                        <div style={styles.text}>No data available</div>
                    )}
                </div>
            )}
        </Container>
    );
};

const styles = {
    scrollContainer: {
        height: '100%',
        overflowY: 'auto',
        paddingLeft: 20,
        paddingRight: 20,
    },
    text: {
        color: colors.black400,
        fontSize: 14,
        paddingTop: 80,
        paddingBottom: 40,
    }
};

export default PrivacyTerms;