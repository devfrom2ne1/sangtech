import React, { useState, useEffect } from "react";
import styled from 'styled-components';
import colors from '../assets/colors';
import { FaCog, FaUser } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import apiUrl from '../assets/apiUrl';
import { auth } from '../assets/firebase';
import { useAuth } from '../components/AuthContext';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

const Profile = () => {

  const navigate = useNavigate();

  const { login, logout, isLoggedIn, userData, updateUserData } = useAuth();

  const [user, setUser] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if(isLoggedIn === true){
      getUser(userData.user_id);
    }
  }, [isLoggedIn]); // isLoggedIn 값이 변경될 때마다 이펙트 실행

  const getUser = async (user_id) => {
    try {
      const response = await fetch(`${apiUrl}/api/left-right/user/${user_id}`);

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const res = await response.json();
      setUser(res.result);
    } catch (error) {
      console.log(error);
    }
  };

  const handleClickGoogle = () => {
    const provider = new GoogleAuthProvider(); // provider를 구글로 설정
    signInWithPopup(auth, provider) // popup을 이용한 signup
      .then((data) => {
        checkUserData(data.user);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const checkUserData = async (item) => {

    const formData = {
      uid: item.uid
    };

    try {
      const response = await fetch(`${apiUrl}/api/left-right/user/check`, {
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

      if(res.result.length === 0){
        addUserData(item);
      } else {
        login(res.result[0]);
        setUser(res.result[0]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const addUserData = async (item) => {

    const formData = {
      login_type: 'google',
      username: item.displayName,
      email: item.email,
      photo_url: item.photoURL,
      uid: item.uid
    };

    try {
      const response = await fetch(`${apiUrl}/api/left-right/user/add`, {
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
      login(res.result[0]);
      setUser(res.result[0]);
    } catch (error) {
      console.log(error);
    }
  };

  const Container = styled.nav` 
    padding-left: 20px;
    padding-right: 20px;
    padding-bottom: 80px;
  `;

  const CircleWithIcon = styled.div`
    width: 80px;
    height: 80px;
    border-radius: 50%;
    background-color: #F29F05; /* 동그라미의 배경색을 설정 */
    display: flex;
    justify-content: center;
    align-items: center;
  `;

  const PersonIcon = styled(FaUser)`
    color: white; /* 아이콘 색상 설정 */
    font-size: 48px; /* 아이콘 크기 설정 */
  `;

  const ProgressBarContainer = styled.div`
    position: relative;
    width: 100%;
    height: 32px;
    border-radius: 24px;
    overflow: hidden;
    margin-top: 12px;
    margin-bottom: 12px;
  `;

  const ProgressBarFill = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    background-color: ${({ color }) => color};
    width: ${({ width }) => width};
  `;

  const PercentageTextLeft = styled.div`
    position: absolute;
    top: 50%;
    left: 8px;
    transform: translateY(-50%);
    color: white;
    font-size: 12px;
    font-weight: 500;
  `;

  const PercentageTextRight = styled.div`
    position: absolute;
    top: 50%;
    right: 8px;
    transform: translateY(-50%);
    color: white;
    font-size: 12px;
    font-weight: 500;
  `;

  const ProgressBar = ({ leftCount, rightCount }) => {
    var leftPercentage = 0;
    var rightPercentage = 0;

    if(Number(leftCount) !== 0 || Number(rightCount) !== 0) {
      leftPercentage = Number(leftCount) / (Number(leftCount) + Number(rightCount)) * 100;
      rightPercentage = 100 - leftPercentage;
    }

    const leftWidth = `${leftPercentage}%`;

    return (
      <ProgressBarContainer style={{ backgroundColor: Number(leftCount) === 0 &&  Number(rightCount) === 0 ? colors.black100 : colors.rightColor }}>
        <ProgressBarFill width={leftWidth} color={colors.leftColor} />
        <PercentageTextLeft style={{ color: Number(leftCount) === 0 &&  Number(rightCount) === 0 ? colors.black300 : 'white' }}>{leftPercentage.toFixed(1)}%</PercentageTextLeft>
        <PercentageTextRight style={{ color: Number(leftCount) === 0 &&  Number(rightCount) === 0 ? colors.black300 : 'white' }}>{rightPercentage.toFixed(1)}%</PercentageTextRight>
      </ProgressBarContainer>
    );
  };

  const handleClickLogout = () => {
    alert('로그아웃 되셨습니다 :)');
    logout();
    logout();
  };

  const handleClickFeedback = () => {
    navigate('/feedback');
  };

  const handleClickAdvertising = () => {
    navigate('/advertising');
  };

  const handleClickPrivacyTerms = () => {
    navigate('/privacy-terms');
  };

  const handleClickServiceTerms = () => {
    navigate('/service-terms');
  };

  const handleClickInstagram = () => {
    const instagramURL = 'https://www.instagram.com/left_right.toyple/';
    // window.open()으로 새 창 열기
    window.open(instagramURL, '_blank');
  };

  const questions = [
    {type: 'gender', title: '성별을 입력해주세요', answers: ['남성', '여성']},
    {type: 'job', title: '어떤 일을 하시나요?', answers: ['학생', '자영업/경영직', '직장인', '공무원/공기업/교사', '전문직', '자유직(프리랜서 포함)', '무직/취준생', '기타']},
    {type: 'age', title: '연령대를 입력해주세요!', answers: ['20대 미만', '20대', '30대', '40대', '50대', '60대', '70대 이상']},
    {type: 'region', title: '어느 지역에 사시나요?', answers: ['서울', '인천', '대전', '대구', '광주', '울산', '부산', '세종', '경기도', '강원도', '충청북도', '충청남도', '전라북도', '전라남도', '경상북도', '경상남도', '제주도', '해외']}
  ];

  const [selectedAnswers, setSelectedAnswers] = useState({}); // 각 질문 유형에 대한 선택된 답변을 저장

  // 선택된 답변이 있는지 확인하는 함수
  const isSelected = (questionType, answer) => {
    return selectedAnswers[questionType] === answer;
  };

  // 답변 선택 또는 해제 시 상태 업데이트하는 함수
  const toggleAnswer = (questionType, answer) => {
    setSelectedAnswers(prevState => ({
      ...prevState,
      [questionType]: prevState[questionType] === answer ? null : answer // 선택된 답변이 현재 답변과 같으면 해제, 아니면 선택
    }));
  };

  const handleSubmit = () => {
    // 각 유형별로 선택된 항목 수를 저장할 객체
    const selectedCounts = {};

    // 각 질문 유형에 대해 선택된 항목 수를 계산
    questions.forEach(question => {
      selectedCounts[question.type] = question.answers.filter(answer => selectedAnswers[question.type] === answer).length;
    });

    // 하나도 선택되지 않은 유형이 있는지 확인
    const isAnyTypeNotSelected = questions.some(question => selectedCounts[question.type] === 0);

    // 하나도 선택되지 않은 유형이 있으면 알림 표시
    if (isAnyTypeNotSelected) {
      alert('모든 항목을 선택해주세요 :)');
    } else {
      // 선택된 항목들을 서버로 제출하거나 다른 작업을 수행
      // 선택된 값들을 formData 객체에 넣기
      const formData = {
        user_id: userData.user_id,
        gender: selectedAnswers['gender'], // 선택된 성별 값 또는 빈 문자열
        job: selectedAnswers['job'], // 선택된 직업 값 또는 빈 문자열
        age: selectedAnswers['age'], // 선택된 연령 값 또는 빈 문자열
        region: selectedAnswers['region'], // 선택된 지역 값 또는 빈 문자열
      };

      // formData를 사용하여 서버로 정보 업데이트 요청 보내기
      updateUserInfo(formData);
    }
  };

  const updateUserInfo = async (formData) => {

    try {
      const response = await fetch(`${apiUrl}/api/left-right/user/info/update`, {
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

      updateUserData({ ...userData,
        gender: selectedAnswers['gender'],
        job: selectedAnswers['job'],
        age: selectedAnswers['age'],
        region: selectedAnswers['region']
      });

      alert('프로필 정보가 업데이트 되었습니다 :)');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      {isLoggedIn === false ? (
        <div style={{ height: '90vh', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontSize: 24, color: colors.black600, fontWeight: 700, whiteSpace: 'pre-line', paddingTop: 80 }}>{'번거로운 상테크,\n계산기로 더욱 편리하게!'}</div>
            <img
              src={process.env.PUBLIC_URL + '/images/logo-large.png'}
              style={{ height: 48, marginTop: 30 }}
            />
          </div>
          <div style={{ textAlign: 'center', paddingBottom: 100 }}>
            <div style={styles.row}>
              <hr style={{ flex: 1, ...styles.line }} />
              <div style={{ flex: 1, fontSize: 14, fontWeight: 700 }}>간편 로그인</div>
              <hr style={{ flex: 1, ...styles.line }} />
            </div>
            <img
              src={process.env.PUBLIC_URL + '/images/login-google.png'}
              style={{ height: 48, marginTop: 24, cursor: 'pointer' }}
              onClick={() => handleClickGoogle()}
            />
          </div>
        </div>
      ) : (
        <>
          {userData.gender === null ? (
            <>
              <div style={{ color: colors.black300, fontSize: 14, paddingTop: 24 }}>
                {'정확한 투표 통계를 위한 정보 입력 페이지입니다 :)'}
              </div>
              {questions.map((question, index) => (
                <div key={index} style={{ marginTop: 35 }}>
                  <div style={{ color: 'black', fontSize: 24, fontWeight: 700, marginBottom: 20 }}>{question.title}</div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                    {question.answers.map((answer, i) => (
                      <div
                        key={i}
                        style={{
                          ...styles.answerButton,
                          backgroundColor: isSelected(question.type, answer) ? 'black' : colors.black100,
                          color: isSelected(question.type, answer) ? 'white' : colors.black300,
                        }}
                        onClick={() => toggleAnswer(question.type, answer)}
                      >
                        {answer}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
              <div style={{ ...styles.answerButton, width: '100%', backgroundColor: colors.black600, marginTop: 35 }} onClick={() => handleSubmit()}>
                <div style={{ color: 'white', fontSize: 16 }}>완료하기</div>
              </div>
            </>
          ) : (
            <div style={{ height: '90vh' }}>
              <div>
                <div style={{ ...styles.nameDiv, ...styles.row, justifyContent: 'space-between' }}>
                  <div style={styles.name}>{user.username}님</div>
                  <div style={{ ...styles.itemSubText, cursor: 'pointer', textDecoration: 'underline' }} onClick={() => handleClickLogout()} >로그아웃</div>
                  {/* <FaCog style={styles.setting} /> */}
                </div>
                <div style={{ ...styles.row, justifyContent: 'space-between', marginRight: 40 }}>
                  <CircleWithIcon>
                    <PersonIcon />
                  </CircleWithIcon>
                  <div style={styles.itemDiv}>
                    <img
                      src={process.env.PUBLIC_URL + '/images/left-icon.png'}
                      style={styles.gradeIcon}
                    />
                    <div style={styles.itemSubText}>등급</div>
                  </div>
                  <div style={styles.itemDiv}>
                    <div style={styles.itemText}>{Number(user.left_count) + Number(user.right_count)}</div>
                    <div style={styles.itemSubText}>투표</div>
                  </div>
                  <div style={styles.itemDiv}>
                    <div style={styles.itemText}>{user.reply_count}</div>
                    <div style={styles.itemSubText}>의견</div>
                  </div>
                </div>
                <div style={styles.descriptionDiv}>
                  <div>{user.username}님은</div>
                  {Number(user.left_count) === 0 && Number(user.right_count) === 0 ? (
                    <div style={styles.row}>
                      <div>투표참여가 부족해 성향 분석이 어렵습니다.</div>
                    </div>
                  ) : (
                    <div style={styles.row}>
                      {user.left_count >= user.right_count ? (
                        <div style={{ color: colors.leftColor }}>왼쪽 성향</div>
                      ) : (
                        <div style={{ color: colors.rightColor }}>오른쪽 성향</div>
                      )}
                      <div>에 가깝습니다.</div>
                    </div>
                  )}

                </div>
                <div style={{ ...styles.row, justifyContent: 'space-between' }}>
                  <div style={styles.argumentText}>
                    <div>왼쪽</div>
                    <div>{user.left_count}투표</div>
                  </div>
                  <div style={{ ...styles.argumentText, textAlign: 'right' }}>
                    <div>오른쪽</div>
                    <div>{user.right_count}투표</div>
                  </div>
                </div>
                <ProgressBar leftCount={user.left_count} rightCount={user.right_count} />
              </div>
              <div style={{ marginTop: 48 }}>
                <div style={styles.lowerTitle}>문의사항</div>
                <div style={styles.lowerSubTitle} onClick={() => handleClickFeedback()} >토론주제/기능/오류 제보</div>
                <div style={styles.lowerSubTitle} onClick={() => handleClickAdvertising()} >광고 및 협력 문의</div>
                <br/>
                <div style={styles.lowerSubTitle} onClick={() => handleClickPrivacyTerms()} >개인정보 처리방침</div>
                <div style={styles.lowerSubTitle} onClick={() => handleClickServiceTerms()} >서비스 이용약관</div>
                <br/>
                <div style={styles.lowerSubTitle} onClick={() => handleClickInstagram()} >instagram 방문</div>
              </div>
            </div>
          )}
        </>
      )}
    </Container>
  );
};

const styles = {
  line: {
    border: '1px solid #EEEEEE',
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  answerButton: {
    height: 46,
    width: 'calc(50% - 5px)',
    cursor: 'pointer',
    borderRadius: 12,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  nameDiv: {
    height: 52,
    paddingTop: 8,
    paddingBottom: 8,
  },
  name: {
    fontSize: 16,
    fontWeight: 700,
  },
  setting: {
    width: 20,
    height: 20,
    cursor: 'pointer',
  },
  gradeIcon: {
    witdh: 24,
    height: 24,
  },
  itemDiv: {
    textAlign: 'center',
  },
  itemText: {
    color: colors.black600,
    fontSize: 18,
    fontWeight: 500,
    height: 24,
  },
  itemSubText: {
    color: colors.black400,
    fontSize: 14,
    height: 16,
  },
  descriptionDiv: {
    marginTop: 40,
    marginBottom: 20,
    color: colors.black600,
    fontSize: 16,
    fontWeight: 700,
  },
  argumentText: {
    color: colors.black400,
    fontSize: 14,
    fontWeight: 500,
  },
  lowerTitle: {
    color: colors.black500,
    fontSize: 20,
    fontWeight: 700,
    marginBottom: 12,
  },
  lowerSubTitle: {
    color: colors.black400,
    fontSize: 14,
    fontWeight: 500,
    cursor: 'pointer',
    marginBottom: 8,
  },
};

export default Profile;