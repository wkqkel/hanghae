import React, { useState } from "react"

import CommentWrite from "../components/CommentWrite"
import CommentList from "../components/CommentList"
import { Grid, Text, Button } from "../elements"
import styled from "styled-components"

import { useSelector, useDispatch } from "react-redux"
import { actionCreators as commentsActions } from "../redux/modules/comments"

import { actionCreators as postActions } from "../redux/modules/post"

const PostDetail = (props) => {
  const dispatch = useDispatch()
  const [comment, setComment] = useState("")

  const id = props.match.params.id

  let [isJoin, setIsJoin] = React.useState(false)

  const loginUserName = localStorage.getItem("loginUserName")
  React.useEffect(() => {
    dispatch(commentsActions.getCommentFB(id))
    // 페이지 새로고침 시 포스트 1개만 새로 요청하기
    // 발생한 이슈 useEffect가 비동기로 처리돼서 처음에 []을 아래에서 읽으려고 해서 에러 발생_ 해결방법 3가지
    // 1. 리턴 아래부분을 컴포넌트로 빼서 props로 넘겨주는 방법
    // 2. useSelector을 사용하지않고, 클릭하는 버튼에서 링크투로 부모 컴포넌트에서 리스트를 넘겨받는 방법
    // 3. 이번에는 찾아본 결과_ 아래 리턴 부분에 해당 데이터가 쓰이는 곳에 post&& 같은 조건식을 달아주어서 빈값이면 아예 접근 못하게 해서 해결.
    if (!post) {
      dispatch(postActions.getOnePostDB(id))
    }

    if (post && post.curMembers.includes(loginUserName)) {
      setIsJoin(true)
    }
  }, [])
  const post_list = useSelector((store) => store.post.list)
  const post = post_list.find((p) => p.postId === id)

  const clickJoin = () => {
    // let loginUser = { userName: loginUserName }
    // setIsJoin(!isJoin)
    // if (isJoin) {
    //   dispatch(postActions.deleteJoinDB(id, loginUser))
    // } else {
    //   dispatch(postActions.addJoinDB(id, loginUser))
    // }
  }

  const onChange = (e) => {
    setComment(e.target.value)
  }

  const write = () => {
    const comments = {
      comment,
    }
    dispatch(commentsActions.addCommentFB(id, comments))
    setComment("")
  }
  return (
    <Container>
      <Grid margin="30px 0px">
        <Grid is_flex>
          <Category>{post && post.category}</Category>
          <Title>{post && post.title}</Title>
        </Grid>
        <Grid is_flex padding="10px">
          <Text bold>{post && post.userName}</Text>
          <Text bold>{post && post.createDate}</Text>
        </Grid>
        <Contents>{post && post.contents}</Contents>
        <Grid is_flex>
          <Grid width="auto" padding="10px">
            <Grid padding="10px" width="110px">
              <Text>{post && post.deadLine}</Text>
            </Grid>
          </Grid>
          <Grid is_flex margin="0px 5px">
            <Text>
              {post && post.curMembers.length} / {post && post.maxMembers}
            </Text>

            <Button width="100px" _onClick={clickJoin}>
              {post &&
              post.curMembers.length === post.maxMembers &&
              !post.curMembers.includes(loginUserName)
                ? "마감완료"
                : isJoin
                ? "참여취소"
                : "참여하기"}
            </Button>
          </Grid>
        </Grid>
        <Grid is_flex width="auto">
          <Button disable width="60px" margin="0px 10px">
            수정
          </Button>
          <Button disable width="60px">
            삭제
          </Button>
        </Grid>
      </Grid>
      <Grid bg="#E8F3F1" borderRadius>
        <CommentWrite postId={id} _onClick={write} />
        <CommentList postId={id} />
      </Grid>
      <Hr />
    </Container>
  )
}

PostDetail.defaultProps = {
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

const Category = styled.div`
  box-sizing: border-box;
  border-radius: 10px;
  background-color: #9dcabf;
  color: white;
  padding: 16px 10px;
  width: 30%;
  text-align: center;
  margin-right: 3px;
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

const Hr = styled.hr`
  border-bottom: 2px;
`

export default PostDetail
