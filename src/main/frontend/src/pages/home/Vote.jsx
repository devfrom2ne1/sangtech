import React, { useState, useEffect } from "react";
import styled from 'styled-components';
import colors from '../../assets/colors';
import { FaVoteYea, FaUser, FaChevronDown, FaThumbsUp, FaThumbsDown } from 'react-icons/fa'; 
import { useNavigate, useParams } from 'react-router-dom';
import apiUrl from '../../assets/apiUrl';
import { useAuth } from '../../components/AuthContext';
import HeaderBackButton from '../../components/HeaderBackButton';

const Vote = () => {

  const navigate = useNavigate();

  const { isLoggedIn, userData } = useAuth();
  const { vote_id } = useParams();

  const [voteData, setVoteData] = useState(null);
  const [repliesData, setRepliesData] = useState(null);
  const [userVoteData, setUserVoteData] = useState([]);

  useEffect(() => {
    getVoteData();
    getReplisData();
  }, []);

  useEffect(() => {
    if(isLoggedIn === true) {
      getUserVote(userData.user_id);
    }
  }, [isLoggedIn]); // isLoggedIn 값이 변경될 때마다 이펙트 실행

  const getVoteData = async () => {
    try {
        const response = await fetch(`${apiUrl}/api/left-right/vote/${vote_id}`);
      
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const res = await response.json();
        setVoteData(res.result);
    } catch (error) {
        console.log(error);
    }
  };

  const getReplisData = async () => {

    const formData = {
      vote_id: vote_id
    };

    try {
      const response = await fetch(`${apiUrl}/api/left-right/vote/replies`, {
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
      setRepliesData(res.result);

    } catch (error) {
      console.log(error);
    }
  };

  const getUserVote = async (user_id) => {

    const formData = {
      user_id: user_id,
      vote_id: vote_id
    };

    try {
      const response = await fetch(`${apiUrl}/api/left-right/user/vote`, {
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
      
      if(res.result !== undefined) {
        if(res.result[0].vote_side === 'left') {
          setSelectedArgument('left');
        } else {
          setSelectedArgument('right');
        }

        setUserVoteData(res.result[0]);
      }

    } catch (error) {
      console.log(error);
    }
  };

  const Container = styled.nav` 
    padding-top: 50px;
    padding-bottom: 80px;
    overflow-y: auto; /* 세로 스크롤이 필요할 때만 스크롤 표시 */
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

  const CircleWithIcon = styled.div`
    position: relative;
    border-radius: 50%;
    background-color: #F29F05; /* 동그라미의 배경색을 설정 */
    display: flex;
    justify-content: center;
    align-items: center;
  `;

  const PersonIcon = styled(FaUser)`
    color: white; /* 아이콘 색상 설정 */
    font-size: 24px; /* 아이콘 크기 설정 */
  `;

  const SideIcon = styled.img`
    width: 16px;
    height: 16px;
    position: absolute;
    bottom: 0;
    right: 0;
  `;

  const ButtonContainer = styled.div`
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    max-width: 480px;
    margin-left: auto;
    margin-right: auto;
    height: 56px;
    background-color: black;
    display: flex;
    align-items: center;
    justify-content: space-between;
  `;

  const [selectedArgument, setSelectedArgument] = useState(null); // 클릭된 요소의 인덱스를 추적하는 상태

  // 클릭된 요소의 인덱스를 설정하는 함수
  const handleArgumentClick = (side) => {
    setSelectedArgument(prevSide => prevSide === side ? null : side);
  };

  const [selectedOption, setSelectedOption] = useState('최신순');

  const handleDropdownChange = (event) => {
    setSelectedOption(event.target.value);
    // 여기에서 선택된 옵션에 따라 작업을 수행할 수 있습니다.
  };

  const onClickRepliesAll = () => {
    navigate('/replies');
  };

  const onClickVote = () => {
    // 현재 날짜와 시간을 가져오는 함수
    const currentDate = new Date();

    // 데이터베이스에서 가져온 close_at 문자열을 Date 객체로 변환
    const closeDate = new Date(voteData.close_at);

    // 현재 날짜와 close_at 날짜 비교
    if (currentDate > closeDate) {
      alert('이미 종료된 투표입니다 :)');
    } else if(isLoggedIn === false) {
      alert('로그인이 필요합니다 :)');
      navigate('/profile');
    } else if(selectedArgument === null) {
      alert('투표 항목을 선택해주세요 :)');
    } else {
      addUserVote(userData.user_id, vote_id, selectedArgument);
    }
  };

  const addUserVote = async (user_id, vote_id, vote_side) => {

    const formData = {
      user_id: user_id,
      vote_id: vote_id,
      vote_side: vote_side,
    };

    try {
      const response = await fetch(`${apiUrl}/api/left-right/user/vote/add`, {
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

      alert('투표가 완료되었습니다 :)');
      
      /*
        (1) progressbar 업데이트
        (2) 투표 수 업데이트
        (3) 어디가 앞서고 있는지 업데이트
      */

      // repliesData를 복사하여 temp로 만듦
      const tempRepliesData = [...repliesData];
      const tempUserVoteData = userVoteData;

      if (vote_side == 'left') {
        /*
          (1) 이미 투표를 했던 경우에는 변함 없게 적용
          (2) 다른 편에 투표를 했던 경우에는 반대편 숫자 -1 처리
        */

        if(userVoteData.vote_side === undefined) {
          setVoteData(prevVoteData => ({ ...prevVoteData, left_count: Number(prevVoteData.left_count) + 1, right_count: Number(prevVoteData.right_count) - 0 }));
        } else if(userVoteData.vote_side === 'right') {
          setVoteData(prevVoteData => ({ ...prevVoteData, left_count: Number(prevVoteData.left_count) + 1, right_count: Number(prevVoteData.right_count) - 1 }));
        }

        // 수정
        tempRepliesData.forEach(item => {
          if (item.user_id === userData.user_id) {
            item.vote_side = "left";
            item.nested_replies.forEach(reply => {
              if (reply.user_id === userData.user_id) {
                reply.vote_side = "left";
              }
            });
          }
        });

        // 변경된 상태로 설정
        setRepliesData(tempRepliesData);

        tempUserVoteData.vote_side = 'left';
        setUserVoteData(tempUserVoteData);

      } else {
        if(userVoteData.vote_side === undefined) {
          setVoteData(prevVoteData => ({ ...prevVoteData, left_count: Number(prevVoteData.left_count) - 0, right_count: Number(prevVoteData.right_count) + 1 }));
        } else if(userVoteData.vote_side === 'left') {
          setVoteData(prevVoteData => ({ ...prevVoteData, left_count: Number(prevVoteData.left_count) - 1, right_count: Number(prevVoteData.right_count) + 1 }));
        }

        // 수정
        tempRepliesData.forEach(item => {
          if (item.user_id === userData.user_id) {
            item.vote_side = "right";
            item.nested_replies.forEach(reply => {
              if (reply.user_id === userData.user_id) {
                reply.vote_side = "right";
              }
            });
          }
        });

        // 변경된 상태로 설정
        setRepliesData(tempRepliesData);

        tempUserVoteData.vote_side = 'right';
        setUserVoteData(tempUserVoteData);
      }

    } catch (error) {
      console.log(error);
    }
  };

  const handleClickNews = (url) => {
    // window.open()으로 새 창 열기
    window.open(url, '_blank');
  };

  const onClickNestedReplies = (replyId) => {
    setRepliesData(prevRepliesData => 
      prevRepliesData.map(item => ({
        ...item,
        showNestedReplies: item.reply_id === replyId ? !item.showNestedReplies : item.showNestedReplies
      }))
    );
  };

  const replyReport = (reply_id) => {
    if(isLoggedIn === false){
      alert('로그인이 필요합니다 :)');
    } else {
      addReplyReport(userData.user_id, reply_id);
    }
  };

  const addReplyReport = async (user_id, reply_id) => {

    const formData = {
      user_id: user_id,
      reply_id: reply_id,
    };

    try {
      const response = await fetch(`${apiUrl}/api/left-right/vote/reply/report`, {
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
      alert('의견 신고가 완료되었습니다. 빠르게 조치하도록 하겠습니다 :)');
    } catch (error) {
      console.log(error);
    }
  };

  const nestedReplyReport = (nested_reply_id) => {
    if(isLoggedIn === false){
      alert('로그인이 필요합니다 :)');
    } else {
      addNestedReplyReport(userData.user_id, nested_reply_id);
    }
  };

  const addNestedReplyReport = async (user_id, nested_reply_id) => {

    const formData = {
      user_id: user_id,
      nested_reply_id: nested_reply_id,
    };

    try {
      const response = await fetch(`${apiUrl}/api/left-right/vote/nested_reply/report`, {
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
      alert('댓글 신고가 완료되었습니다. 빠르게 조치하도록 하겠습니다 :)');
    } catch (error) {
      console.log(error);
    }
  };

  const replyLike = (reply_id) => {
    if(isLoggedIn === false){
      alert('로그인이 필요합니다 :)');
    } else {
      const tempRepliesData = [...repliesData];

      const targetReplyIndex = tempRepliesData.findIndex(reply => reply.reply_id === reply_id);

      if (!tempRepliesData[targetReplyIndex].user_reply_likes) {
        tempRepliesData[targetReplyIndex].user_reply_likes = []; // 없으면 빈 배열로 초기화
      }

      if(tempRepliesData[targetReplyIndex].user_reply_likes.includes(userData.user_id)) {
        likeReply(userData.user_id, reply_id, 'y', null);
      } else {
        likeReply(userData.user_id, reply_id, null, 'y');
      }
    }
  };

  const replyDislike = (reply_id) => {
    if(isLoggedIn === false){
      alert('로그인이 필요합니다 :)');
    } else {
      const tempRepliesData = [...repliesData];

      const targetReplyIndex = tempRepliesData.findIndex(reply => reply.reply_id === reply_id);

      if (!tempRepliesData[targetReplyIndex].user_reply_dislikes) {
        tempRepliesData[targetReplyIndex].user_reply_dislikes = []; // 없으면 빈 배열로 초기화
      }

      if(tempRepliesData[targetReplyIndex].user_reply_dislikes.includes(userData.user_id)) {
        likeReply(userData.user_id, reply_id, 'n', null);
      } else {
        likeReply(userData.user_id, reply_id, null, 'n');
      }
    }
  };

  const likeReply = async (user_id, reply_id, before, after) => {

    const formData = {
      user_id: user_id,
      reply_id: reply_id,
      like_yn: after,
    };

    try {
      const response = await fetch(`${apiUrl}/api/left-right/vote/reply/like`, {
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

      /*
        after가 null인 경우,
        (1) 'y'에서 null로 바뀌는 경우, 'y' 취소
        (2) 'n'에서 null로 바뀌는 경우, 'n' 취소

        (1) after가 'y'인 경우, 'n'이 클릭되어 있는 경우, 'n' 취소
        (2) after가 'n'인 경우, 'y'가 클릭되어 있는 경우, 'n' 취소
      */ 
      
      const tempRepliesData = [...repliesData];
      const targetReplyIndex = tempRepliesData.findIndex(reply => reply.reply_id === reply_id);

      if (!tempRepliesData[targetReplyIndex].user_reply_likes) {
        tempRepliesData[targetReplyIndex].user_reply_likes = []; // 없으면 빈 배열로 초기화
      }

      if (!tempRepliesData[targetReplyIndex].user_reply_dislikes) {
        tempRepliesData[targetReplyIndex].user_reply_dislikes = []; // 없으면 빈 배열로 초기화
      }

      if(after === null) {
        if(before === 'y'){
          const indexToRemove = tempRepliesData[targetReplyIndex].user_reply_likes.findIndex(item => item === user_id);

          // 제거할 요소가 배열에 있다면 제거
          if (indexToRemove !== -1) {
            tempRepliesData[targetReplyIndex].user_reply_likes.splice(indexToRemove, user_id);
          }
        } else if(before === 'n') {
          const indexToRemove = tempRepliesData[targetReplyIndex].user_reply_dislikes.findIndex(item => item === user_id);

          // 제거할 요소가 배열에 있다면 제거
          if (indexToRemove !== -1) {
            tempRepliesData[targetReplyIndex].user_reply_dislikes.splice(indexToRemove, user_id);
          }
        }
      } else if(after === 'y') {
        const indexToRemove = tempRepliesData[targetReplyIndex].user_reply_dislikes.findIndex(item => item === user_id);

        // 제거할 요소가 배열에 있다면 제거
        if (indexToRemove !== -1) {
          tempRepliesData[targetReplyIndex].user_reply_dislikes.splice(indexToRemove, user_id);
        }

        tempRepliesData[targetReplyIndex].user_reply_likes.push(user_id);
      } else if(after === 'n') {
        const indexToRemove = tempRepliesData[targetReplyIndex].user_reply_likes.findIndex(item => item === user_id);

        // 제거할 요소가 배열에 있다면 제거
        if (indexToRemove !== -1) {
          tempRepliesData[targetReplyIndex].user_reply_likes.splice(indexToRemove, user_id);
        }

        tempRepliesData[targetReplyIndex].user_reply_dislikes.push(user_id);
      }

      setRepliesData(tempRepliesData);

    } catch (error) {
      console.log(error);
    }
  };

  const nestedReplyLike = (reply_id, nested_reply_id) => {
    if(isLoggedIn === false){
      alert('로그인이 필요합니다 :)');
    } else {
      const tempRepliesData = [...repliesData];
      const targetReplyIndex = tempRepliesData.findIndex(reply => reply.reply_id === reply_id);
      const targetNestedReplyIndex = tempRepliesData[targetReplyIndex].nested_replies.findIndex(nested_reply => nested_reply.nested_reply_id === nested_reply_id);

      if (!tempRepliesData[targetReplyIndex].nested_replies[targetNestedReplyIndex].user_nested_reply_likes) {
        tempRepliesData[targetReplyIndex].nested_replies[targetNestedReplyIndex].user_nested_reply_likes = []; // 없으면 빈 배열로 초기화
      }

      if (!tempRepliesData[targetReplyIndex].nested_replies[targetNestedReplyIndex].user_nested_reply_dislikes) {
        tempRepliesData[targetReplyIndex].nested_replies[targetNestedReplyIndex].user_nested_reply_dislikes = []; // 없으면 빈 배열로 초기화
      }

      if(tempRepliesData[targetReplyIndex].nested_replies[targetNestedReplyIndex].user_nested_reply_likes.includes(userData.user_id)) {
        likeNestedReply(userData.user_id, reply_id, nested_reply_id, 'y', null);
      } else {
        likeNestedReply(userData.user_id, reply_id,nested_reply_id, null, 'y');
      }
    }
  };

  const nestedReplyDislike = (reply_id, nested_reply_id) => {
    if(isLoggedIn === false){
      alert('로그인이 필요합니다 :)');
    } else {
      const tempRepliesData = [...repliesData];
      const targetReplyIndex = tempRepliesData.findIndex(reply => reply.reply_id === reply_id);
      const targetNestedReplyIndex = tempRepliesData[targetReplyIndex].nested_replies.findIndex(nested_reply => nested_reply.nested_reply_id === nested_reply_id);

      if (!tempRepliesData[targetReplyIndex].nested_replies[targetNestedReplyIndex].user_nested_reply_likes) {
        tempRepliesData[targetReplyIndex].nested_replies[targetNestedReplyIndex].user_nested_reply_likes = []; // 없으면 빈 배열로 초기화
      }

      if (!tempRepliesData[targetReplyIndex].nested_replies[targetNestedReplyIndex].user_nested_reply_dislikes) {
        tempRepliesData[targetReplyIndex].nested_replies[targetNestedReplyIndex].user_nested_reply_dislikes = []; // 없으면 빈 배열로 초기화
      }

      if(tempRepliesData[targetReplyIndex].nested_replies[targetNestedReplyIndex].user_nested_reply_dislikes.includes(userData.user_id)) {
        likeNestedReply(userData.user_id, reply_id, nested_reply_id, 'n', null);
      } else {
        likeNestedReply(userData.user_id, reply_id,nested_reply_id, null, 'n');
      }
    }
  };

  const likeNestedReply = async (user_id, reply_id, nested_reply_id, before, after) => {

    const formData = {
      user_id: user_id,
      nested_reply_id: nested_reply_id,
      like_yn: after,
    };

    try {
      const response = await fetch(`${apiUrl}/api/left-right/vote/nested_reply/like`, {
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

      /*
        after가 null인 경우,
        (1) 'y'에서 null로 바뀌는 경우, 'y' 취소
        (2) 'n'에서 null로 바뀌는 경우, 'n' 취소

        (1) after가 'y'인 경우, 'n'이 클릭되어 있는 경우, 'n' 취소
        (2) after가 'n'인 경우, 'y'가 클릭되어 있는 경우, 'n' 취소
      */

      const tempRepliesData = [...repliesData];
      const targetReplyIndex = tempRepliesData.findIndex(reply => reply.reply_id === reply_id);
      const targetNestedReplyIndex = tempRepliesData[targetReplyIndex].nested_replies.findIndex(nested_reply => nested_reply.nested_reply_id === nested_reply_id);

      if (!tempRepliesData[targetReplyIndex].nested_replies[targetNestedReplyIndex].user_nested_reply_likes) {
        tempRepliesData[targetReplyIndex].nested_replies[targetNestedReplyIndex].user_nested_reply_likes = []; // 없으면 빈 배열로 초기화
      }

      if (!tempRepliesData[targetReplyIndex].nested_replies[targetNestedReplyIndex].user_nested_reply_dislikes) {
        tempRepliesData[targetReplyIndex].nested_replies[targetNestedReplyIndex].user_nested_reply_dislikes = []; // 없으면 빈 배열로 초기화
      }

      if (after === null) {
        if (before === 'y') {
          const indexToRemove = tempRepliesData[targetReplyIndex].nested_replies[targetNestedReplyIndex].user_nested_reply_likes.findIndex(item => item === user_id);

          // 제거할 요소가 배열에 있다면 제거
          if (indexToRemove !== -1) {
            tempRepliesData[targetReplyIndex].nested_replies[targetNestedReplyIndex].user_nested_reply_likes.splice(indexToRemove, user_id);
          }
        } else if (before === 'n') {
          const indexToRemove = tempRepliesData[targetReplyIndex].nested_replies[targetNestedReplyIndex].user_nested_reply_dislikes.findIndex(item => item === user_id);

          // 제거할 요소가 배열에 있다면 제거
          if (indexToRemove !== -1) {
            tempRepliesData[targetReplyIndex].nested_replies[targetNestedReplyIndex].user_nested_reply_dislikes.splice(indexToRemove, user_id);
          }
        }
      } else if (after === 'y') {
        const indexToRemove = tempRepliesData[targetReplyIndex].nested_replies[targetNestedReplyIndex].user_nested_reply_dislikes.findIndex(item => item === user_id);

        // 제거할 요소가 배열에 있다면 제거
        if (indexToRemove !== -1) {
          tempRepliesData[targetReplyIndex].nested_replies[targetNestedReplyIndex].user_nested_reply_dislikes.splice(indexToRemove, user_id);
        }

        tempRepliesData[targetReplyIndex].nested_replies[targetNestedReplyIndex].user_nested_reply_likes.push(user_id);
      } else if (after === 'n') {
        const indexToRemove = tempRepliesData[targetReplyIndex].nested_replies[targetNestedReplyIndex].user_nested_reply_likes.findIndex(item => item === user_id);

        // 제거할 요소가 배열에 있다면 제거
        if (indexToRemove !== -1) {
          tempRepliesData[targetReplyIndex].nested_replies[targetNestedReplyIndex].user_nested_reply_likes.splice(indexToRemove, user_id);
        }

        tempRepliesData[targetReplyIndex].nested_replies[targetNestedReplyIndex].user_nested_reply_dislikes.push(user_id);
      }

      setRepliesData(tempRepliesData);

    } catch (error) {
      console.log(error);
    }
  };

  const replyDelete = (reply_id) => {
    deleteReply(reply_id);
  };

  const deleteReply = async (reply_id) => {

    const formData = {
      reply_id: reply_id,
    };

    try {
      const response = await fetch(`${apiUrl}/api/left-right/vote/reply/delete`, {
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
      alert('의견이 삭제 되었습니다 :)');

      // reply_id가 replyId와 일치하지 않는 항목들로 새로운 배열을 생성하여 상태를 업데이트합니다.
      const updatedReplies = repliesData.filter(reply => reply.reply_id !== reply_id);
      setRepliesData(updatedReplies);

      setVoteData(prevVoteData => ({ ...prevVoteData, reply_count: Number(prevVoteData.reply_count) - 1 }));
    } catch (error) {
      console.log(error);
    }
  };

  const nestedReplyDelete = ( nested_reply_id) => {
    deleteNestedReply(nested_reply_id);
  };

  const deleteNestedReply = async (nested_reply_id) => {

    const formData = {
      nested_reply_id: nested_reply_id,
    };

    try {
      const response = await fetch(`${apiUrl}/api/left-right/vote/nested_reply/delete`, {
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
      alert('댓글이 삭제 되었습니다 :)');

      // repliesData를 복사하여 temp로 만듦
      const tempRepliesData = [...repliesData];

      // tempRepliesData를 수정
      tempRepliesData.forEach(reply => {
        if (reply.nested_replies) {
          reply.nested_replies = reply.nested_replies.filter(nestedReply => nestedReply.nested_reply_id !== nested_reply_id);
        }
      });

      // 변경된 tempRepliesData를 상태로 설정
      setRepliesData(tempRepliesData);
    } catch (error) {
      console.log(error);
    }
  };

  const replySubmit = () => {
    const reply_comment = document.getElementById('reply_comment').value;

    if(reply_comment === '') {
      alert('의견을 입력해주세요 :)');
    } else {
      addReply(userData.user_id, vote_id, reply_comment);
    }
  };

  const addReply = async (user_id, vote_id, comment) => {

    const formData = {
      user_id: user_id,
      vote_id: vote_id,
      comment: comment,
    };

    try {
      const response = await fetch(`${apiUrl}/api/left-right/vote/reply/add`, {
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
      getReply(res.result[0].reply_id);
    } catch (error) {
        console.log(error);
    }
  };

  const getReply = async (reply_id) => {
    try {
      const response = await fetch(`${apiUrl}/api/left-right/vote/reply/${reply_id}`);

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const res = await response.json();
      
      // repliesData를 복사하여 temp로 만듦
      const tempRepliesData = [...repliesData];

      // tempRepliesData를 수정
      tempRepliesData.push(res.result);

      // 변경된 tempRepliesData를 상태로 설정
      setRepliesData(tempRepliesData);

      setVoteData(prevVoteData => ({ ...prevVoteData, reply_count: Number(prevVoteData.reply_count) + 1 }));
    } catch (error) {
      console.log(error);
    }
  };

  const nestedReplySubmit = (reply_id) => {
    const nested_reply_comment = document.getElementById(`nested_reply_comment_${reply_id}`).value;

    if(nested_reply_comment === ''){
      alert('댓글을 입력해주세요 :)');
    } else {
      addNestedReply(userData.user_id, reply_id, nested_reply_comment);
    }
  };

  const addNestedReply = async (user_id, reply_id, comment) => {

    const formData = {
      user_id: user_id,
      reply_id: reply_id,
      comment: comment,
    };

    try {
      const response = await fetch(`${apiUrl}/api/left-right/vote/nested_reply/add`, {
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
      getNestedReply(reply_id, res.result[0].nested_reply_id, vote_id);
    } catch (error) {
        console.log(error);
    }
  };

  const getNestedReply = async (reply_id, nested_reply_id, vote_id) => {

    const formData = {
      nested_reply_id: nested_reply_id,
      vote_id: vote_id,
    };

    try {
      const response = await fetch(`${apiUrl}/api/left-right/vote/nested_reply`, {
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

      // repliesData를 복사하여 temp로 만듦
      const tempRepliesData = [...repliesData];

      // tempRepliesData에서 reply_id가 일치하는 요소 찾기
      const targetReplyIndex = tempRepliesData.findIndex(reply => reply.reply_id === reply_id);

      if (!tempRepliesData[targetReplyIndex].nested_replies) {
        tempRepliesData[targetReplyIndex].nested_replies = []; // nested_replies가 없으면 빈 배열로 초기화
      }

      tempRepliesData[targetReplyIndex].nested_replies.push(res.result);

      // 변경된 tempRepliesData를 상태로 설정
      setRepliesData(tempRepliesData);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      <HeaderBackButton backUrl="/" />
      <div style={styles.scrollContainer}>
        <div style={styles.voteTitle}>{voteData && voteData.title}</div>
        <img
          src={voteData && voteData.image_url}
          style={styles.voteImg}
        />
        <div style={styles.voteDescription}>
          {voteData && voteData.description}
        </div>
        <div style={{ marginTop: 20, marginBottom: 40 }}>
          <div style={{ 
              ...styles.voteButton, 
              border: selectedArgument === 'left' ? '2px solid black' : '1px solid #CFCBC9',
              fontWeight: selectedArgument === 'left' ? 600 : 400
            }} 
            onClick={() => handleArgumentClick('left')
          }>
            <img
              src={process.env.PUBLIC_URL + '/images/left-icon.png'}
              style={styles.voteIcon}
            />
            {voteData && voteData.left_argument}
          </div>
          <div style={{ 
              ...styles.voteButton, 
              border: selectedArgument === 'right' ? '2px solid black' : '1px solid #CFCBC9',
              fontWeight: selectedArgument === 'right' ? 600 : 400
            }} 
            onClick={() => handleArgumentClick('right')}
          >
            <img
              src={process.env.PUBLIC_URL + '/images/right-icon.png'}
              style={styles.voteIcon}
            />
            {voteData && voteData.right_argument}
          </div>
        </div>
        <ProgressBar leftCount={voteData && voteData.left_count} rightCount={voteData && voteData.right_count} />
        <div style={{ ...styles.row, justifyContent: 'center' }}>
          <div style={{ ...styles.row, marginRight: 8 }}>
            <FaVoteYea style={styles.icon} />
            <div style={styles.iconText}>&nbsp; {voteData && (Number(voteData.left_count) + Number(voteData.right_count))}명 투표</div>
          </div>
        </div>
        <div>
          <div style={{ ...styles.repliesCountDiv, ...styles.row }}>
            <div style={styles.repliesCountText}>의견 {voteData && voteData.reply_count}개</div>
            {/* <select style={{ ...styles.repliesCountFilter, ...styles.row }} value={selectedOption} onChange={handleDropdownChange}>
              <option value="최신순">{'최신순\u00A0'}<FaChevronDown /></option>
              <option value="최신순">{'최신순\u00A0'}<FaChevronDown /></option>
            </select> */}
          </div>
          <hr />
          {repliesData && repliesData.map((item, index) => (
            <div key={index} style={{ marginTop: 16, marginBottom: 16 }}>
              <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                <div style={{ flex: 'none' }}>
                  <CircleWithIcon style={{ width: 40, height: 40 }}>
                    <PersonIcon />
                    {item.vote_side === null ? (null) : (
                      <>
                        {item.vote_side === 'left' ? (
                          <SideIcon src={process.env.PUBLIC_URL + '/images/left-icon.png'} style={{ width: 16, height: 16 }} />
                        ) : (
                          <SideIcon src={process.env.PUBLIC_URL + '/images/right-icon.png'} style={{ width: 16, height: 16 }} />
                        )}
                      </>
                    )}
                  </CircleWithIcon>
                </div>
                <div style={{ width: 'calc(100% - 50px)' }}>
                  <div style={{ ...styles.row, justifyContent: 'space-between' }}>
                    <div style={{ fontSize: 14 }}>{item.username}</div>
                    <div style={{ ...styles.row, fontSize: 12, cursor: 'pointer', color: '#666666' }}>
                      <div onClick={() => replyReport(item.reply_id)}>신고</div>
                      <div>&nbsp;&nbsp;</div>
                      {userData && userData.user_id === item.user_id ? (
                        <div onClick={() => replyDelete(item.reply_id)}>삭제</div>
                      ) : (null)}
                    </div>
                  </div>
                  <div style={{ marginTop: 8, marginBottom: 12 }}>
                    <div style={{ fontSize: 14, color: '#666666', wordWrap: 'break-word' }}>{item.comment}</div>
                  </div>
                  <div style={{ ...styles.row, justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', flexDirection: 'row', cursor: 'pointer', fontSize: 12, fontWeight: 700 }} onClick={() => onClickNestedReplies(item.reply_id)}>
                      <div style={{ color: colors.black600 }}>댓글&nbsp;</div>
                      <div style={{ color: colors.black400 }}>{item.nested_replies !== null ? (item.nested_replies.length) : 0}</div>
                    </div>
                    <div style={{ ...styles.row, fontSize: 12 }}>
                      <div style={{ ...styles.row, cursor: 'pointer' }} onClick={() => replyLike(item.reply_id)}>
                        <FaThumbsUp color={ isLoggedIn && item.user_reply_likes && item.user_reply_likes.includes(userData.user_id) ? colors.black600 : colors.black200 } />
                        <div style={{ color: isLoggedIn && item.user_reply_likes && item.user_reply_likes.includes(userData.user_id) ? colors.black600 : '#666666' }}>&nbsp;{item.user_reply_likes === null ? 0 : item.user_reply_likes.length}</div>
                      </div>
                      <div style={{ ...styles.row, cursor: 'pointer', marginLeft: 6 }} onClick={() => replyDislike(item.reply_id)}>
                        <FaThumbsDown color={ isLoggedIn && item.user_reply_dislikes && item.user_reply_dislikes.includes(userData.user_id) ? colors.black600 : colors.black200 } />
                        <div style={{ color: isLoggedIn && item.user_reply_dislikes && item.user_reply_dislikes.includes(userData.user_id) ? colors.black600 : '#666666' }}>&nbsp;{item.user_reply_dislikes === null ? 0 : item.user_reply_dislikes.length}</div>
                      </div>
                    </div>
                  </div>
                  {item.showNestedReplies ? (
                    <>
                      {item.nested_replies && item.nested_replies.map((i, index) => (
                        <div key={index} style={{ marginTop: 16, marginBottom: 8 }}>
                          {index !== 0 ? (<hr style={styles.line} />) : (null)}
                          <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                            <div style={{ flex: 'none' }}>
                              <CircleWithIcon style={{ width: 24, height: 24 }}>
                                <PersonIcon style={{ fontSize: 12 }} />
                                {i.vote_side === null ? (null) : (
                                  <>
                                    {i.vote_side === 'left' ? (
                                      <SideIcon src={process.env.PUBLIC_URL + '/images/left-icon.png'} style={{ width: 12, height: 12 }} />
                                    ) : (
                                      <SideIcon src={process.env.PUBLIC_URL + '/images/right-icon.png'} style={{ width: 12, height: 12 }} />
                                    )}
                                  </>
                                )}
                              </CircleWithIcon>
                            </div>
                            <div style={{ width: 'calc(100% - 30px)' }}>
                              <div style={{ ...styles.row, justifyContent: 'space-between' }}>
                                <div style={{ fontSize: 14 }}>{i.username}</div>
                                <div style={{ ...styles.row, fontSize: 12, cursor: 'pointer', color: '#666666' }}>
                                  <div onClick={() => nestedReplyReport(i.nested_reply_id)}>신고</div>
                                  <div>&nbsp;&nbsp;</div>
                                  {userData.user_id === i.user_id ? (
                                    <div onClick={() => nestedReplyDelete(i.nested_reply_id)}>삭제</div>
                                  ) : (null)}
                                </div>
                              </div>
                              <div style={{ marginTop: 8, marginBottom: 12 }}>
                                <div style={{ fontSize: 14, color: '#666666', wordWrap: 'break-word' }}>{i.comment}</div>
                              </div>
                              <div style={{ ...styles.row, justifyContent: 'space-between' }}>
                                <div></div>
                                
                                <div style={{ ...styles.row, fontSize: 12 }}>
                                  <div style={{ ...styles.row, cursor: 'pointer' }} onClick={() => nestedReplyLike(item.reply_id, i.nested_reply_id)}>
                                    <FaThumbsUp color={isLoggedIn && i.user_nested_reply_likes && i.user_nested_reply_likes.includes(userData.user_id) ? colors.black600 : colors.black200} />
                                    <div style={{ color: isLoggedIn && i.user_nested_reply_likes && i.user_nested_reply_likes.includes(userData.user_id) ? colors.black600 : '#666666' }}>
                                      &nbsp;{i.user_nested_reply_likes === null ? 0 : i.user_nested_reply_likes.length}
                                    </div>
                                  </div>
                                  <div style={{ ...styles.row, cursor: 'pointer', marginLeft: 6 }} onClick={() => nestedReplyDislike(item.reply_id, i.nested_reply_id)}>
                                    <FaThumbsDown color={isLoggedIn && i.user_nested_reply_dislikes && i.user_nested_reply_dislikes.includes(userData.user_id) ? colors.black600 : colors.black200} />
                                    <div style={{ color: isLoggedIn && i.user_nested_reply_dislikes && i.user_nested_reply_dislikes.includes(userData.user_id) ? colors.black600 : '#666666' }}>
                                      &nbsp;{i.user_nested_reply_dislikes === null ? 0 : i.user_nested_reply_dislikes.length}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}

                      {isLoggedIn ? (
                        <div style={{ borderRadius: 8, border: '1px solid #EEEEEE', padding: 10, marginTop: 16 }}>
                          <div style={styles.row}>
                            <CircleWithIcon style={{ width: 24, height: 24 }}>
                              <PersonIcon style={{ fontSize: 12 }} />
                              {userVoteData.vote_side === undefined ? (null) : (
                                <>
                                  {userVoteData.vote_side === 'left' ? (
                                    <SideIcon src={process.env.PUBLIC_URL + '/images/left-icon.png'} style={{ width: 12, height: 12 }} />
                                  ) : (
                                    <SideIcon src={process.env.PUBLIC_URL + '/images/right-icon.png'} style={{ width: 12, height: 12 }} />
                                  )}
                                </>
                              )}
                            </CircleWithIcon>
                            <div style={{ fontSize: 14, marginLeft: 8 }}>{userData.username}</div>
                          </div>
                          <textarea
                            id={`nested_reply_comment_${item.reply_id}`}
                            type="text"
                            placeholder="다양한 댓글이 서로 존중될 수 있도록 작성해주세요"
                            style={{ ...styles.repliesInput, resize: 'none', height: 'auto', paddingTop: 12, marginTop: 8, marginBottom: 4 }}
                            rows={4}
                          />
                          <div style={{ ...styles.row, justifyContent: 'flex-end' }} onClick={() => nestedReplySubmit(item.reply_id)}>
                            <div style={{ ...styles.replySubmit, ...styles.row, justifyContent: 'center' }}>등록</div>
                          </div>
                        </div>
                      ) : (
                        <input
                          type="text"
                          placeholder="댓글을 입력하시려면 로그인 해주세요"
                          style={{ ...styles.repliesInput, marginTop: 16 }}
                          disabled
                        />
                      )}
                    </>
                  ) : (null)}
                </div>
              </div>
              {index !== repliesData.length - 1 ? (<hr style={styles.line} />) : (null)}
            </div>
          ))}
          {isLoggedIn ? (
            <div style={{ borderRadius: 8, border: '1px solid #EEEEEE', padding: 10 }}>
              <div style={styles.row}>
                <CircleWithIcon style={{ width: 24, height: 24 }}>
                  <PersonIcon style={{ fontSize: 12 }} />
                  {userVoteData.vote_side === undefined ? (null) : (
                    <>
                      {userVoteData.vote_side === 'left' ? (
                        <SideIcon src={process.env.PUBLIC_URL + '/images/left-icon.png'} style={{ width: 12, height: 12 }} />
                      ) : (
                        <SideIcon src={process.env.PUBLIC_URL + '/images/right-icon.png'} style={{ width: 12, height: 12 }} />
                      )}
                    </>
                  )}
                </CircleWithIcon>
                <div style={{ fontSize: 14, marginLeft: 8 }}>{userData.username}</div>
              </div>
              <textarea
                id="reply_comment"
                type="text"
                placeholder="다양한 의견이 서로 존중될 수 있도록 작성해주세요"
                style={{ ...styles.repliesInput, resize: 'none', height: 'auto', paddingTop: 12, marginTop: 8, marginBottom: 4 }}
                rows={4}
              />
              <div style={{ ...styles.row, justifyContent: 'flex-end' }} onClick={() => replySubmit()}>
                <div style={{ ...styles.replySubmit, ...styles.row, justifyContent: 'center' }}>등록</div>
              </div>
            </div>
          ) : (
            <input
              type="text"
              placeholder="의견을 입력하시려면 로그인 해주세요"
              style={styles.repliesInput}
              disabled
            />
          )}
          {/* <div style={styles.repliesAll} onClick={() => onClickRepliesAll()} >전체보기</div> */}
        </div>
        <div>
          <div style={{ ...styles.repliesCountDiv, ...styles.row }}>
            <div style={styles.repliesCountText}>관련 뉴스</div>
          </div>
          <hr />
          <div>
            {voteData && JSON.parse(voteData.news).map((item, index) => (
              <div key={index}>
                <div style={styles.articleText} onClick={() => handleClickNews(item.url)}>{item.title}</div>
                <hr style={styles.line} />
              </div>
            ))}
          </div>
        </div>
      </div>
      <ButtonContainer>
        <div style={{ ...styles.buttonDiv, ...styles.row }}>
          <div style={{ ...styles.buttonLeft }} >
            <div style={{ ...styles.buttonLeftText, ...styles.row }}>
              {voteData && Number(voteData.left_count) + Number(voteData.right_count) === 0 ? (
                <>
                  <div style={{ ...styles.row, fontWeight: 500 }}>
                    <div style={{ color: colors.leftColor }}>왼쪽</div>
                    <div>&nbsp;혹은&nbsp;</div>
                    <div style={{ color: colors.rightColor }}>오른쪽</div>
                    <div>{'에 투표를 해보세요 :)'}</div>
                  </div>
                </>
              ) : (
                <>
                  {voteData && voteData.left_count >= voteData.right_count ? (
                    <>
                      <img
                        src={process.env.PUBLIC_URL + '/images/left-icon.png'}
                        style={{ width: 16, height: 16 }}
                      />
                      <div style={{ ...styles.row, fontWeight: 500 }}>
                        <div style={{ color: colors.leftColor }}>&nbsp;왼쪽</div>
                        <div>이 {voteData && (voteData.left_count - voteData.right_count)}표 앞서고 있습니다.</div>
                      </div>
                    </>
                  ) : (
                    <>
                      <img
                        src={process.env.PUBLIC_URL + '/images/right-icon.png'}
                        style={{ width: 16, height: 16 }}
                      />
                      <div style={{ ...styles.row, fontWeight: 500 }}>
                        <div style={{ color: colors.rightColor }}>&nbsp;오른쪽</div>
                        <div>이 {voteData && (voteData.right_count - voteData.left_count)}표 앞서고 있습니다.</div>
                      </div>
                    </>
                  )}
                </>
              )}
            </div>
          </div>
          <div style={styles.spacing}></div>
          <div style={{ ...styles.buttonRight, ...styles.row, backgroundColor: colors.tangerine600 }} onClick={() => onClickVote()} >
            <div style={{ ...styles.buttonRightText }} >투표하기</div>
          </div>
        </div>
      </ButtonContainer>
    </Container>
  );
};

const styles = {
  scrollContainer: {
    overflowY: 'auto',
    height: 'calc(100%)',
    paddingLeft: 20,
    paddingRight: 20,
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  voteTitle: {
    fontSize: 20,
    fontWeight: 700,
    textAlign: 'center',
    marginTop: 24,
  },
  voteImg: {
    width: '100%',
    borderRadius: 12,
    marginTop: 20,
    marginBottom: 20,
  },
  voteDescription: {
    fontSize: 14,
    textAlign: 'center',
    paddingLeft: 40,
    paddingRight: 40,
    color: colors.black500,
  },
  voteButton: {
    height: 60,
    borderRadius: 12,
    cursor: 'pointer',
    fontSize: 14,
    marginBottom: 8,
    display: 'flex',
    alignItems: 'center', // 수직 가운데 정렬
  },
  voteIcon: {
    width: 16,
    height: 16,
    marginLeft: 12,
    marginRight: 8,
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
  repliesCountDiv: {
    justifyContent: 'space-between',
    marginTop: 40,
  },
  repliesCountText: {
    color: colors.black600,
    fontSize: 14,
    fontWeight: 700,
  },
  repliesCountFilter: {
    color: colors.black600,
    fontSize: 12,
    fontWeight: 500,
    cursor: 'pointer',
    border: 'none',
  },
  line: {
    border: '1px solid #EEEEEE',
  },
  repliesInput: {
    width: 'calc(100% - 12px)',
    height: 45,
    borderRadius: 8,
    border: '1px solid #EEEEEE',
    paddingLeft: 12,
  },
  replySubmit: {
    backgroundColor: 'black', 
    width: 52, 
    height: 30, 
    color: 'white', 
    fontSize: 14, 
    cursor: 'pointer',
    borderRadius: 6,
  },
  repliesAll: {
    width: '100%',
    height: 45,
    backgroundColor: '#DDDDDD',
    borderRadius: 8,
    cursor: 'pointer',
    color: colors.black500,
    fontSize: 14,
    display: 'flex',
    alignItems: 'center', // 수직 가운데 정렬
    justifyContent: 'center',
    marginTop: 16,
  },
  articleText: {
    fontSize: 16,
    cursor: 'pointer',
    marginTop: 12,
    marginBottom: 12,
    whiteSpace: 'nowrap', // 여러 줄을 허용하지 않고 한 줄로만 표시
    overflow: 'hidden', // 넘치는 부분을 감춤
    textOverflow: 'ellipsis', // 넘칠 경우 ...으로 축약
  },
  buttonDiv: {
    width: '100%',
    height: '100%',
    borderTop: '1px solid var(--gray-300, #EAEAEA)', // 테두리 추가
  },
  buttonLeft: {
    flex: 5,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    height: '100%', // 버튼 영역의 높이를 꽉 차게 설정
    backgroundColor: 'white',
    paddingLeft: 20,
    paddingRight: 20,
  },
  buttonRight: {
    flex: 5,
    height: '100%', // 버튼 영역의 높이를 꽉 차게 설정
    borderRadius: 12,
    justifyContent: 'center',
    cursor: 'pointer',
  },
  buttonLeftText: {
    fontSize: 12,
    fontWeight: 500,
    color: colors.black600,
  },
  buttonRightText: {
    fontSize: 16,
    fontWeight: 700,
    color: 'white',
  },
};

export default Vote;