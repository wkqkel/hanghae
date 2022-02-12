import React from "react"

import { Grid, Text, Button, Input } from "../elements"
import styled from "styled-components"

const PostWrite = (props) => {
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
  return (
    <Container>
      <Grid margin="30px 0px">
        <Grid is_flex>
          <Category>
            <option value="study">스터디</option>
            <option value="sport">투어</option>
            <option value="study">스포츠</option>
            <option value="study">반려동물</option>
            <option value="sport">게임/오락</option>
            <option value="study">영화/예술</option>
            <option value="study">봉사활동</option>
          </Category>
          <Title>{title}</Title>
        </Grid>
        <Grid is_flex padding="10px">
          <Text bold>{userName}</Text>
          <Text bold>{createDate}</Text>
        </Grid>
        <Contents>{contents}</Contents>
        <Grid is_flex>
          <Grid width="auto" padding="10px">
            <Grid padding="10px" width="110px">
              <Text>{deadLine}</Text>
            </Grid>
          </Grid>
          <Grid is_flex margin="0px 5px">
            <Text>
              {curMembers} / {maxMembers}
            </Text>
            <Button disable width="100px">
              수정하기
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  )
}

PostWrite.defaultProps = {
  postId: "1",
  userId: "",
  title: "제목11",
  userName: "모미니",
  contents: "같이 스터디 하실분을 구합니다!!!",
  createDate: "2022-02-12",
  deadLine: "2022-02-28",
  maxMembers: 6,
  curMembers: 1,
  category: "스터디",
}

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0;
  padding: 0% 15%;
  @media only screen and (max-width: 768px) {
    padding: 0% 3%;
  }
`

const Category = styled.select`
  box-sizing: border-box;
  border-radius: 10px;
  background-color: #9dcabf;
  color: white;
  padding: 16px 10px;
  width: 30%;
  text-align: center;
  margin-right: 3px;
  border: none;
`

const Title = styled.div`
  box-sizing: border-box;
  border-radius: 10px;
  border: 2px solid #9dcabf;
  width: 80%;
  padding: 15px;
`

const Contents = styled.div`
  box-sizing: border-box;
  border-radius: 10px;
  border: 2px solid #9dcabf;
  width: 100%;
  padding: 15px;
  height: 30vh;
`

export default PostWrite
