import React, { useState, useEffect } from "react";
import styled from 'styled-components';
import { FaVoteYea, FaRegComment, FaRegClock } from 'react-icons/fa';
import colors from '../assets/colors';
import { useNavigate } from 'react-router-dom';
import apiUrl from '../assets/apiUrl';
import { useAuth } from '../components/AuthContext';

const Home = () => {

  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [voteType, setVoteType] = useState('ing');
  const [comingSoonVote, setComingSoonVote] = useState([]);
  const [ingVotes, setIngVotes] = useState([]);
  const [endedVotes, setEndedVotes] = useState([]);

  const { isLoggedIn, userData, updateUserData } = useAuth();

  useEffect(() => {
    getVotesData();
  }, []);

  const getVotesData = async () => {

    try {
      const response = await fetch(`${apiUrl}/api/left-right/vote`);
      
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();

      // 현재 날짜 가져오기
      const currentDate = new Date();

      // 데이터 배열에서 현재 날짜를 기준으로 필터링하여 각 변수에 할당
      const comingSoonData = data.result.filter(vote => new Date(vote.open_at) > currentDate)[0]; // 다가오는 투표
      const ingVotes = data.result.filter(vote => new Date(vote.open_at) <= currentDate && new Date(vote.close_at) >= currentDate); // 진행 중인 투표
      const endedVotes = data.result.filter(vote => new Date(vote.close_at) < currentDate); // 종료된 투표

      // 각 변수에 할당된 데이터를 상태로 설정
      setComingSoonVote(comingSoonData);
      setIngVotes(ingVotes);
      setEndedVotes(endedVotes);
    } catch (error) {
      console.log(error);
    }
  };

  const handleVoteTypeChange = (type) => {
    setVoteType(type);
  };

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

  const handleClickVote = (vote_id) => {
    navigate('/vote/' + vote_id);
  };

  const formatDate = (dateTimeString) => {
    const date = new Date(dateTimeString);
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    
    return `${day}일 ${hours}시 ${minutes}분`;
  };

  const formatDateDifference = (dateTimeString) => {
    const targetDate = new Date(dateTimeString);
    const currentDate = new Date();
  
    const timeDifference = targetDate.getTime() - currentDate.getTime();
    const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const hoursDifference = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutesDifference = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
  
    return `${daysDifference}일 ${hoursDifference.toString().padStart(2, '0')}:${minutesDifference.toString().padStart(2, '0')}`;
  };

  return (
    <div style={styles.container}>
      {isLoading ? (null) : (
        <div>
          <div style={{ ...styles.header, ...styles.row }}>
            <img
              src={process.env.PUBLIC_URL + '/images/logo.png'}
              style={styles.logo}
            />
          </div>
          <div style={{ ...styles.voteTypeDiv, ...styles.row }}>
            <div
              style={{
                ...styles.voteTypeButton,
                backgroundColor: voteType === 'ing' ? 'black' : 'white',
                border: voteType === 'ing' ? '1px solid black' : '1px solid #DDDDDD',
              }}
              onClick={() => handleVoteTypeChange('ing')}
            >
              <div style={{
                ...styles.voteTypeText,
                color: voteType === 'ing' ? 'white' : '#111111',
                fontWeight: voteType === 'ing' ? 700 : 400,
              }}>
                진행중인 투표
              </div>
            </div>
            <div
              style={{
                ...styles.voteTypeButton,
                backgroundColor: voteType === 'closed' ? 'black' : 'white',
                border: voteType === 'closed' ? '1px solid black' : '1px solid #DDDDDD',
              }}
              onClick={() => handleVoteTypeChange('closed')}
            >
              <div style={{
                ...styles.voteTypeText,
                color: voteType === 'closed' ? 'white' : '#111111',
                fontWeight: voteType === 'closed' ? 700 : 400,
              }}>
                종료된 투표
              </div>
            </div>
          </div>
          {voteType === 'ing' ? (
            <div style={{ height: '80vh' }}>
              <div style={{ ...styles.comingSoonDiv, ...styles.row, justifyContent: 'space-between' }}>
                <div>
                  <div style={styles.comingSoonDate}>{comingSoonVote && formatDate(comingSoonVote.open_at)} OPEN 예정</div>
                  <div style={styles.comingSoonText}>{comingSoonVote ? comingSoonVote.title : '새로운 투표가 올라올 예정입니다.'}</div>
                </div>
                <img
                  src={process.env.PUBLIC_URL + '/images/coming-soon.png'}
                  style={styles.comingSoonImg}
                />
              </div>
              <div style={styles.votesDiv}>
                {ingVotes ? (ingVotes.map((item, index) => (
                  <div style={styles.voteDiv} onClick={() => handleClickVote(item.vote_id)}>
                    <div style={styles.imageWithText}>
                      <img
                        src={item.image_url}
                        style={styles.voteImg}
                      />
                      <div style={{ ...styles.textOnImage, ...styles.row }}>
                        <FaRegClock />
                        <div>&nbsp; {formatDateDifference(item.close_at)} 남음</div>
                      </div>
                    </div>
                    <div style={styles.voteTitle}>{item.title}</div>
                    <div style={{ ...styles.row, justifyContent: 'space-between', paddingLeft: 60, paddingRight: 60 }}>
                      <div style={styles.voteLeftText}>{item.left_argument}</div>
                      <div style={styles.voteVsText}>vs</div>
                      <div style={styles.voteRightText}>{item.right_argument}</div>
                    </div>
                    <ProgressBar leftCount={item.left_count} rightCount={item.right_count} />
                    <div style={{ ...styles.row, justifyContent: 'center' }}>
                      <div style={{ ...styles.row, marginRight: 8 }}>
                        <FaVoteYea style={styles.icon} />
                        <div style={styles.iconText}>&nbsp; {Number(item.left_count) + Number(item.right_count)}명 투표</div>
                      </div>
                      <div style={styles.row}>
                        <FaRegComment style={styles.icon} />
                        <div style={styles.iconText}>&nbsp; {item.reply_count}</div>
                      </div>
                    </div>
                  </div>
                ))) : (null)}
              </div>
            </div>
          ) : (
            <div style={{ paddingLeft: 20, paddingRight: 20, height: '80vh' }}>
              {endedVotes.length === 0 ? (
                <div style={styles.centerText}>
                  <div>아직 종료된 투표가 없습니다.</div>
                </div>
              ) : (
                <>
                  {endedVotes && endedVotes.map((item, index) => (
                    <div style={{ ...styles.endedVoteDiv, ...styles.row }} onClick={() => handleClickVote(item.vote_id)}>
                      <img
                        src={item.image_url}
                        style={styles.endedVoteImg}
                      />
                      <div style={styles.endedVoteContent}>
                        <div style={styles.endedVoteTitle}>{item.title}</div>
                        <div style={{ ...styles.row, marginTop: 8, marginBottom: 16, }}>
                          <div style={{ ...styles.row, marginRight: 8 }}>
                            <FaVoteYea style={styles.icon} />
                            <div style={styles.iconText}>&nbsp; {Number(item.left_count) + Number(item.right_count)}명 투표</div>
                          </div>
                          <div style={styles.row}>
                            <FaRegComment style={styles.icon} />
                            <div style={styles.iconText}>&nbsp; {item.reply_count}</div>
                          </div>
                        </div>
                        <div style={{ ...styles.row, justifyContent: 'space-between' }}>
                          <div style={{ ...styles.endedVoteWinText, color: item.left_count >= item.right_count ? colors.leftColor : colors.rightColor }}>
                            {item.left_count >= item.right_count ? item.left_argument : item.right_argument}
                          </div>
                          <div style={{ ...styles.endedVoteWinText, color: item.left_count >= item.right_count ? colors.leftColor : colors.rightColor }}>
                            {item.left_count >= item.right_count ? '왼쪽' : '오른쪽'} 승리
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    paddingTop: 8,
    paddingBottom: 60,
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  header: {
    paddingLeft: 20,
    paddingRight: 20,
  },
  logo: {
    width: 36,
    height: 36,
  },
  voteTypeDiv: {
    marginTop: 8,
    marginBottom: 16,
    paddingLeft: 20,
    paddingRight: 20,
  },
  voteTypeButton: {
    backgroundColor: 'black',
    height: 32,
    display: 'flex',
    alignItems: 'center',
    borderRadius: 24,
    paddingLeft: 12,
    paddingRight: 12,
    cursor: 'pointer',
    marginRight: 4,
  },
  voteTypeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 700,
  },
  comingSoonDiv: {
    backgroundColor: '#FDCD34',
    height: 100,
    paddingLeft: 20,
    paddingRight: 20,
  },
  comingSoonDate: {
    fontSize: 12,
    backgroundColor: 'white',
    borderRadius: 4,
    fontWeight: 600,
    paddingTop: 2,
    paddingBottom: 2,
    paddingLeft: 4,
    paddingRight: 4,
    display: 'inline-block', // 텍스트에 맞춰서 배경의 길이를 조정합니다.
  },
  comingSoonText: {
    fontSize: 14,
    fontWeight: 700,
    marginTop: 6,
  },
  comingSoonImg: {
    height: '100%',
  },
  votesDiv: {
    paddingLeft: 20,
    paddingRight: 20,
  },
  voteDiv: {
    marginTop: 32,
    marginBottom: 32,
    cursor: 'pointer',
  },
  voteImg: {
    width: '100%',
    borderRadius: 12,
  },
  imageWithText: {
    position: 'relative',
    width: '100%',
    height: '100%',
  },
  textOnImage: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    color: 'white',
    fontSize: '12px',
    fontWeight: 'bold',
    padding: '8px',
    borderRadius: '4px',
  },
  voteTitle: {
    marginTop: 20,
    marginBottom: 20,
    fontSize: 20,
    fontWeight: 700,
    whiteSpace: 'pre-wrap',
    textAlign: 'center',
  },
  voteLeftText: {
    flex: 1,
    color: colors.leftColor,
    fontSize: 14,
    fontWeight: 600,
    whiteSpace: 'pre-wrap',
    textAlign: 'center',
  },
  voteVsText: {
    flex: 1,
    fontSize: 14,
    fontWeight: 600,
    textAlign: 'center',
  },
  voteRightText: {
    flex: 1,
    color: colors.rightColor,
    fontSize: 14,
    fontWeight: 600,
    whiteSpace: 'pre-wrap',
    textAlign: 'center',
  },
  icon: {
    fontSize: 14,
    color: colors.black400,
  },
  iconText: {
    fontSize: 12,
    fontWeight: 600,
    color: colors.black400,
  },
  centerText: {
    height: '80vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: colors.black400,
  },
  endedVoteDiv: {
    marginTop: 24,
    marginBottom: 24,
    cursor: 'pointer',
  },
  endedVoteImg: {
    width: 100,
    height: 100,
    borderRadius: 12,
  },
  endedVoteContent: {
    flex: 1,
    marginLeft: 12,
  },
  endedVoteTitle: {
    fontSize: 16,
    fontWeight: 700,
  },
  endedVoteWinText: {
    fontSize: 12,
    fontWeight: 700,
  },
};

export default Home;