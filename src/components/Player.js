import React, { useEffect } from "react";
import ReactPlayer from "react-player";
import styled from "styled-components";

import { useDispatch, useSelector } from "react-redux";
import { actionCreators as commonActions } from "../redux/modules/common";
import { actionCreators as playerActions } from "../redux/modules/player";

import { getTimeStringSeconds, calCount } from "./YoutubeDataAPI";

function Player(props) {
  console.log("유튜브플레이어");
  // useSelector로 방정보 받아오고, params이용해 주소창에서 roomId받아와서 일치하는 방정보 추출
  const roomInfo = props.roomInfo;
  const dispatch = useDispatch();
  const { isMuted, vol } = props;
  // 동영상 재생으로 관리될 변수들

  const player = React.useRef();
  const [isPlaying, setIsPlaying] = React.useState(false);
  const sendCurYoutubeTime = React.useRef();
  const NewMedia = window.matchMedia("screen and (max-width: 1440px)");

  const endVideo = () => {
    const recordsData = {
      workOutTime: Math.ceil(player.current.getDuration() / 60),
      category: roomInfo.category,
    };
    dispatch(commonActions.saveRecordsDB(recordsData));
    props.setIsDone(true);
    setIsPlaying(false);
  };

  React.useEffect(() => {
    if (isPlaying) {
      sendCurYoutubeTime.current = setInterval(() => {
        dispatch(
          playerActions.setPlayInfo({
            curYoutubeTime: Math.ceil(player.current.getCurrentTime()),
          })
        );
      }, 1000);
    }
    return () => clearInterval(sendCurYoutubeTime.current);
  }, [isPlaying]);

  return (
    <Container>
      {/* <div style={{ pointerEvents: "none" }}> */}
      <BeforeTimer
        roomInfo={roomInfo}
        setIsPlaying={setIsPlaying}
        player={player}
      ></BeforeTimer>
      <ReactPlayer
        url={roomInfo.videoUrl}
        width={NewMedia.matches ? "758px" : "1095px"} //"758px" //1096px
        height={NewMedia.matches ? "426px" : "616px"} //"426px" //616px
        ref={player}
        playing={isPlaying}
        // 특정시점부터 시작
        config={{
          youtube: {
            playerVars: {
              start: 1,
            },
          },
        }}
        onStart={() => {
          props.setIsStart(true);
        }}
        onEnded={endVideo}
        muted={isMuted}
        volume={vol / 20}
        controls
      />
      {/* </div> */}
    </Container>
  );
}

const Container = styled.div`
  width: 1095px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  @media screen and (max-width: 1440px) {
    width: 758px;
    height: 100%;
  }
`;

export default React.memo(Player);

/// 타이머 분리
const BeforeTimer = (props) => {
  console.log("시작 전 타이머");
  const { roomInfo, setIsPlaying, player } = props;
  const createdAt = new Date(roomInfo.createdAt);
  const videoStartAfter = roomInfo.videoStartAfter;
  const [countTime, setCountTime] = React.useState();

  React.useEffect(() => {
    // 방입장시 동영상시작예정시간-현재시간을 setTimeout으로 계속 차이를 계산해서 타이머로 나타냄
    let getTimeInterval = setInterval(() => {
      const now = Date.now();
      const videoStart = createdAt.getTime() + videoStartAfter * 60000;
      const diffMs = parseInt(videoStart - now);
      const durationS = Math.floor(player.current.getDuration()); // 영상길이(초단위)
      let diffS = parseInt(diffMs / 1000); // 동영상시작예정시간-현재시간(초단위)
      if (diffS > 0) {
        setCountTime(calCount(getTimeStringSeconds(diffS)));
      }
      // 차이가 0보다 작으면 동영상을 재생
      // -일때는 그 차이의 절댓값부터 동영상을 재생
      // 차이의 절댒값이 동영상의 길이보다 크면 영상이 종료되었습니다 띄움.
      if (diffS <= 0) {
        if (Math.abs(diffS) < durationS) {
          player.current.seekTo(parseFloat(Math.abs(diffS)));
          setIsPlaying(true);
          clearInterval(getTimeInterval);
          setCountTime(false);
        } else if (durationS && Math.abs(diffS) >= durationS) {
          // durationS 비동기로 받아오는 값.
          setCountTime("영상이 종료되었습니다");
          clearInterval(getTimeInterval);
        }
      }
    }, 100);
    // unMount되는 경우 interval함수 제거
    return () => clearInterval(getTimeInterval);
  }, []);

  return <>{countTime && <Count>{countTime}</Count>}</>;
};
const Count = styled.div`
  width: 1095px;
  height: 616px;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 70px;
  font-weight: 700;
  color: white;
  position: absolute;
  z-index: 2;
  @media screen and (max-width: 1440px) {
    width: 758px;
    height: 428px;
    font-size: 40px;
  }
`;
