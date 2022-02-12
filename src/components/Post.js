import React from "react"
import { Button, Text, Grid, Input } from "../elements"
import styled, { keyframes } from "styled-components"

const Post = (props) => {
  return (
    <>
      <PostBox>
        <DdayContainer>
          <img src="https://ifh.cc/g/bJPIlS.png" alt="" />
          <SpeechBubble>
            <img src="https://ifh.cc/g/0Elqeg.png" alt="" />
            <BubbleText>D-12</BubbleText>
          </SpeechBubble>
        </DdayContainer>
        <TextContainer>
          <p
            style={{
              fontWeight: 700,
              fontSize: "24px",
              margin: "20px 0px 10px 0",
            }}
          >
            운동갈 사람 구합니다!!!!
          </p>
          <Text size="18" color="#989898">
            매주 수요일 저녁 6시에 운동할 사람 모집해요.
          </Text>
          <TagBox>
            <Text size="18" weight="500" margin="0 5px" color="#4f4f4f">
              #모집인원 1/10
            </Text>
            <Text size="18" weight="500" margin="0 5px" color="#4f4f4f">
              #운동
            </Text>
          </TagBox>
        </TextContainer>
      </PostBox>
    </>
  )
}
const slideUp = keyframes`
  from {
    transform: translateY(200px);
  }
  to {
    transform: translateY(0px);
  }
`

const PostBox = styled.div`
  width: 420px;
  height: 240px;
  box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.25),
    3px 3px 10px 0 rgba(0, 0, 0, 0.25);
  background-color: #fff;
  margin: 14px;
  border-radius: 34px;
  padding: 25px 36px;
  @media only screen and (max-width: 768px) {
    min-width: 330px;
  }
  position: relative;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.5),
      3px 3px 10px 0 rgba(0, 0, 0, 0.25);
    transition: transform 0.6s, translateY 0s linear;
  }
`
const DdayContainer = styled.div`
  display: flex;
`

const TextContainer = styled.div`
  padding: 0px 0px 0px 8px;
`
const SpeechBubble = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 70px;
`
const BubbleText = styled.div`
  position: absolute;
  left: 21px;
  color: #fff;
`
const TagBox = styled.div`  overflow-x: hidden;
  display: flex;
  position: absolute;
  bottom: 35px;
`
export default Post
