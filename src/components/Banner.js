import React from "react"
import styled from "styled-components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons"
import { Text, Button } from "../elements"

const Banner = () => {
  const loginUserId = localStorage.getItem("loginUserId")

  const [scrollState, setScrollState] = React.useState(0)

  const clickNext = () => {}
  const clickPrev = () => {}
  return (
    <Container>
      <FontAwesomeIcon
        onClick={clickPrev}
        icon={faAngleLeft}
        style={{ position: "absolute", left: "40px" }}
      />
      <Carousel>
        <ContentBox style={{ display: "flex" }}>
          <content style={{ display: "flex" }}>
            {/* <h1>{loginUserId ? loginUserId : "안녕하세요"}</h1> */}
            <textBox>
              <h2
                style={{
                  fontFamily: "gmarketBold",
                  fontSize: "38px",
                  marginTop: "40px",
                }}
              >
                야 너두?
              </h2>
              <p style={{ fontSize: "20px", margin: " 0px 70px 10px 0px " }}>
                오늘은 영어 스터디모임 어떠세요{" "}
              </p>
              <Button width="250px">영어스터디 구하러가기</Button>
            </textBox>
            <Img></Img>
            <h1
              style={{
                fontFamily: "tvnBold",
                fontSize: "40px",
                color: "#1b35d2",
              }}
            >
              {loginUserId ? `Hi! ${loginUserId} 롷` : "Let's study Eng 롷"}
            </h1>
          </content>
        </ContentBox>
        <ContentBox style={{ background: "black" }}></ContentBox>
        <ContentBox style={{ background: "purple" }}></ContentBox>
        <ContentBox style={{ background: "blue" }}></ContentBox>
        <ContentBox style={{ background: "green" }}></ContentBox>
      </Carousel>
      <CircleBox>
        <Circle></Circle>
        <Circle></Circle>
        <Circle></Circle>
        <Circle></Circle>
        <Circle></Circle>
      </CircleBox>
      <FontAwesomeIcon
        onClick={clickNext}
        icon={faAngleRight}
        style={{ position: "absolute", right: "40px" }}
      />
    </Container>
  )
}

// 컨테이너에서 화살표색, 배경색 지정
const Container = styled.div`
  width: 100vw;
  height: 300px;
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
`
const Carousel = styled.div`
  display: flex;
`
const ContentBox = styled.div`
  font-size: 22px;
  width: 100vw;
  font-weight: 700;
  line-height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  color: black;
`
const CircleBox = styled.div`
  width: auto;
  display: flex;
  position: relative;
  margin: 0 auto;
`
const Circle = styled.div`
  width: 0.8rem;
  height: 0.8rem;
  background: #dedede;
  border-radius: 100%;
  margin: 0px 5px;
`

const Img = styled.div`
  background-image: url("https://ifh.cc/g/GPUMTv.jpg");
  width: 300px;
  height: 250px;
  background-size: cover;
  background-position: center;
`
export default Banner
