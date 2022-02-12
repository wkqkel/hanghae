import React from "react"
import { Button, Text, Grid, Input } from "../elements"
import styled from "styled-components"

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
        <p style={{ fontWeight: 700, fontSize: "24px" }}>
          운동갈 사람 구합니다!!!!
        </p>
        <Text>매주 수요일 저녁 6시에 운동할 사람 모집해요.</Text>
        <TagBox>
          <Text>#모임장: 테스트</Text>
          <Text>#모집인원 1/10</Text>
          <Text>#운동</Text>
        </TagBox>
      </PostBox>
    </>
  )
}

const PostBox = styled.div`
  width: 420px;
  height: 240px;
  box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.25),
    3px 3px 10px 0 rgba(0, 0, 0, 0.25);
  background-color: #fff;
  margin: 10px;
  border-radius: 34px;
  padding: 20px;
  @media only screen and (max-width: 768px) {
    min-width: 330px;
  }
  position: relative;
`
const DdayContainer = styled.div`
  display: flex;
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
const TagBox = styled.div`
  display: flex;
  position: absolute;
  bottom: 20px;
`
export default Post
