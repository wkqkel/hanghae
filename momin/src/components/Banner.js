import React from "react"
import styled from "styled-components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons"
import { Button } from "../elements"

const Banner = () => {
  //
  // 로컬스토리지에서 유저네임 가져오기
  const loginUserName = localStorage.getItem("loginUserName")

  // 배너인덱스를 useState로 관리
  const [bannerIndex, setBannerIndex] = React.useState(0)

  // map 돌리기 위한 배너 갯수만큼의 배열
  const circleArray = [0, 0, 0, 0, 0]

  // 이전 버튼 클릭시 배너의 인덱스를 -1, 인덱스가 처음이면 마지막으로 돌아가기.
  const clickPrev = () => {
    if (bannerIndex <= 0) {
      setBannerIndex(4)
      return
    }
    setBannerIndex(bannerIndex - 1)
  }
  // 다음 버튼 클릭시 배너의 인덱스를 +1, 인덱스가 마지막이면 처음인 0으로 돌아가기.
  const clickNext = () => {
    if (bannerIndex >= 4) {
      setBannerIndex(0)
      return
    }
    setBannerIndex(bannerIndex + 1)
  }

  // 아래 원형 클릭시에도 인덱스를 바꿔줌
  const clickCircle = (i) => {
    setBannerIndex(i)
  }

  // useEffect와 setInterval을 활용해 일정시간마다 자동으로 슬라이더가 넘어가기 구현
  React.useEffect(() => {
    const slider = setInterval(
      () => setBannerIndex((value) => (value === 4 ? 0 : value + 1)),
      3000
    )
    return () => clearInterval(slider)
  }, [])

  // map돌릴때 쓰일 imgUrl
  const imgURL = [
    "https://ifh.cc/g/GPUMTv.jpg",
    "https://ifh.cc/g/CKsG1H.jpg",
    "https://ifh.cc/g/Z7YrNr.jpg",
    "https://i.pinimg.com/564x/fc/10/66/fc1066bff5fcfa8ff8125f10eec74545.jpg",
    "https://ifh.cc/g/M0MzE9.jpg",
  ]
  // map돌릴때 쓰일 배너멘트
  const bannerMent = [
    ["야 너두?", "오늘은 영어 스터디모임 어떠세요", "영어스터디 구하러가기"],
    ["나만 없어ㅠㅠ", "나도 고양이 키우고 싶다..", "반려동물 모임 구경가기"],
    ["투어", "떠나요. 어디든..", "투어모임 구하러가기"],
    ["요가", "퇴근 후 요가 어때요", "운동모임 구하러가기"],
    ["주말엔", "봉사활동 어떠세요", "봉사활동모임 참여하기"],
  ]

  return (
    <Container>
      <FontAwesomeIcon
        onClick={clickPrev}
        icon={faAngleLeft}
        style={{
          position: "absolute",
          left: "40px",
          zIndex: 1,
          cursor: "pointer",
        }}
      />
      <Carousel bannerIndex={bannerIndex}>
        {circleArray.map((e, i) => (
          <ContentBox style={{ display: "flex" }} index={i} key={i}>
            <Content style={{ display: "flex" }}>
              <TextBox style={{ marginRight: i === 0 ? null : "120px" }}>
                <h2
                  style={{
                    fontFamily: "gmarketBold",
                    fontSize: "38px",
                    marginTop: "40px",
                    color: i === 1 ? "#fff8ca" : i === 3 ? "white" : "black",
                  }}
                >
                  {bannerMent[i][0]}
                </h2>
                <p style={{ fontSize: "20px", margin: " 0px 70px 10px 0px " }}>
                  {bannerMent[i][1]}
                </p>
                <Button width="250px"> {bannerMent[i][2]}</Button>
              </TextBox>
              <Img imgURL={imgURL[i]} index={i}></Img>
              {i === 0 && (
                <h1
                  style={{
                    fontFamily: "tvnBold",
                    fontSize: "40px",
                    color: "#1b35d2",
                  }}
                >
                  {loginUserName
                    ? `Hi! ${loginUserName} 롷`
                    : "Let's study Eng 롷"}
                </h1>
              )}
            </Content>
          </ContentBox>
        ))}
      </Carousel>
      <CircleBox>
        {circleArray.map((e, i) => (
          <Circle
            key={i}
            onClick={() => {
              clickCircle(i)
            }}
            style={{
              width: i === bannerIndex ? "32px" : null,
              borderRadius: i === bannerIndex ? "12px" : null,
              transition: "width 0.1s",
            }}
          ></Circle>
        ))}
      </CircleBox>
      <FontAwesomeIcon
        onClick={clickNext}
        icon={faAngleRight}
        style={{ position: "absolute", right: "40px", cursor: "pointer" }}
      />
    </Container>
  )
}

// 컨테이너에서 화살표색, 배경색 지정
const Container = styled.div`
  width: 100vw;
  height: 350px;
  background: black;
  font-size: 70px;
  display: flex;
  align-items: center;
  flex-direction: column;
  background: white;
  color: #e9e9e9;
  justify-content: center;
  align-items: flex-start;
  @media only screen and (max-width: 1100px) {
    display: none;
  }
  position: relative;
`
const Carousel = styled.div`
  display: flex;
  transform: translate(
    ${(props) => {
      return -(props.bannerIndex * 100) + "vw"
    }}
  );
  transition: all 0.2s;
`
const ContentBox = styled.div`
  font-size: 22px;
  width: 100vw;
  height: 300px;
  font-weight: 700;
  line-height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  color: ${(props) => ([1, 3].includes(props.index) ? "white" : "black")};
  background-color: ${(props) =>
    props.index === 1 ? "#3b5892;" : props.index === 3 ? "#dfc6b2" : null};
`
const TextBox = styled.div``
const Content = styled.div``
const CircleBox = styled.div`
  width: auto;
  display: flex;
  position: absolute;
  bottom: 10%;
  left: 50%;
  transform: translate(-50%, -50%);
`
const Circle = styled.div`
  width: 0.8rem;
  height: 0.8rem;
  background: #dedede;
  border-radius: 100%;
  margin: 0px 5px;
  cursor: pointer;
`

const Img = styled.div`
  background-image: url(${(props) => props.imgURL});
  width: 300px;
  height: 255px;
  background-size: cover;
  background-position: center;
`
export default Banner
