import React from "react"
import { Button, Text, Grid, Input } from "../elements"
import styled, { keyframes } from "styled-components"
import { history } from "../redux/configureStore"
import { useDispatch } from "react-redux"
import { actionCreators as postActions } from "../redux/modules/post"
import { useHistory } from "react-router-dom"

const Post = (props) => {
  const dispatch = useDispatch()
  // postlist.js에서 받아온 props값 사용하기 편리하게 변수로 할당
  const {
    postId,
    userId,
    title,
    userName,
    contents,
    createDate,
    deadLine,
    maxMembers,
    curMembers,
    category,
  } = props

  // D-day 계산
  //YYYY-MM-DD 형식을 Date형으로 변환한 오늘날짜와 마감날짜를 구함
  const today = new Date()
  const stdDate = new Date(
    +deadLine.slice(0, 4),
    +deadLine.slice(5, 7) - 1,
    +deadLine.slice(8, 10)
  )
  // 마감날짜-현재날짜를 구하기위해 Date형을 시간 형으로 바꿔줘서 차이를 구함
  const gapDate = stdDate.getTime() - today.getTime()
  // 차이인 밀리초 단위를 일로 환산
  const gapDay = Math.ceil(gapDate / (60 * 1000 * 60 * 24))
  //#8b8b8b
  return (
    <>
      <PostBox
        gapDay={gapDay}
        onClick={() => {
          // 포스트디테일 페이지로 가기
          // history.push(`/post/${postId}`)
          // 포스트수정 페이지로 가기
          history.push(`/write/${postId}`)
          // dispatch(postActions.deletePostDB(postId))
        }}
      >
        <DdayContainer>
          <img src="https://ifh.cc/g/bJPIlS.png" alt="" />
          <SpeechBubble>
            <img src="https://ifh.cc/g/0Elqeg.png" alt="" />
            <BubbleText
              style={{
                left: gapDay > 100 ? "17px" : gapDay > 9 ? "21px" : "25px",
              }}
            >
              {gapDay < 0 ? `마감` : `D-${gapDay}`}
            </BubbleText>
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
            {title.length > 14 ? title.substring(0, 14) + "..." : title}
          </p>
          <Text size="18" color="#989898">
            {contents.length > 48
              ? contents.substring(0, 47) + "..."
              : contents}
          </Text>
          <TagBox>
            <Text size="18" weight="500" margin="0 5px" color="#4f4f4f">
              {`#모집인원 ${curMembers.length}/${maxMembers}`}
            </Text>
            <Text size="18" weight="500" margin="0 5px" color="#4f4f4f">
              {`#${category}`}
            </Text>
          </TagBox>
        </TextContainer>
      </PostBox>
    </>
  )
}

// 위로 살짝 올라가는 애니메이션 추가
const slideUp = keyframes`
  from {
    transform: translateY(200px);
  }
  to {
    transform: translateY(0px);
  }
`
//#fffdf1
const PostBox = styled.div`
  width: 420px;
  height: 240px;
  box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.25),
    3px 3px 10px 0 rgba(0, 0, 0, 0.25);
  background-color: ${(props) => (props.gapDay < 0 ? "#f0f0f0;" : "#fff;")}
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
  Text {
    color: yellow;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
  }
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
  color: #fff;
`
const TagBox = styled.div`
  overflow-x: hidden;
  display: flex;
  position: absolute;
  bottom: 35px;
`
export default Post
