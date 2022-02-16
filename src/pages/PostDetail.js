import React, { useEffect, useState } from "react"

import CommentWrite from "../components/CommentWrite"
import CommentList from "../components/CommentList"
import { Grid, Text, Button } from "../elements"
import styled from "styled-components"
import JoinBtn from "../components/JoinBtn"
import { useSelector, useDispatch } from "react-redux"
import { actionCreators as commentsActions } from "../redux/modules/comments"
import { actionCreators as postActions } from "../redux/modules/post"
import { history } from "../redux/configureStore"
import { useLocation } from "react-router"

const PostDetail = (props) => {
  const dispatch = useDispatch()
  const [comment, setComment] = useState("")
  const id = props.match.params.id
  // 마감 지난지 여부알아보기 위해(버튼 비활성화), useLocation통해 주소창에서 props.state로 전달받음
  let gapDay = useLocation().state.gapDay

  const post_list = useSelector((store) => store.post.list)
  const post = post_list.find((p) => p.postId === id)
  let [isJoin, setIsJoin] = React.useState(false)
  let [idCheck, setIdCheck] = React.useState(false)

  const loginUserId = localStorage.getItem("loginUserId")
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
      console.log(isJoin)
    }
    if (post && post.userId === loginUserId) {
      setIdCheck(true)
      console.log(idCheck)
    }
    // 중괄호안에 포스트리스트를 넣어주니, 저게 바뀌면 새로 불러와줘서 setJoin도 계속 갱신됨
  }, [post_list])

  const clickJoin = () => {
    // 로그인 유저가 아닌 경우 참여하기 불가
    if (loginUserId === null) {
      window.alert(
        "회원이 아닌 경우, 참여하기가 불가능합니다. 로그인 해주세요~!"
      )
      history.replace("/login")
      return
    }

    // 마감날짜가 지났거나 현재 참여인원수와 최대인원수가 같으면 모집마감
    // 모집마감일 경우 현재 미참여 인원은 클릭 불가
    if (
      gapDay < 0 ||
      (post.curMembers.length === post.maxMembers &&
        !post.curMembers.includes(loginUserName))
    ) {
      alert("아쉽지만, 모집이 마감됐어요.")
      return
    }

    let loginUser = { userName: loginUserName }
    // 클릭시 isJoin여부 토글 트루일때 참여취소_삭제
    setIsJoin(!isJoin)
    if (isJoin) {
      dispatch(postActions.deleteJoinDB(id, loginUser))
    } else {
      dispatch(postActions.addJoinDB(id, loginUser))
    }
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
      {/* {post && < {...post} is_me={post.userId === userId} />} */}
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
            <Grid padding="10px 10px 10px 0px " width="150px" is_flex>
              <Text padding="0 10px 0  0">{post && post.deadLine}</Text>
              <Text>
                {post && post.curMembers.length} / {post && post.maxMembers}
              </Text>
            </Grid>
          </Grid>
          <Grid is_flex margin="0px 5px" justifyRight>
            {idCheck ? (
              <Grid is_flex justifyRight>
                <Button
                  // disable
                  width="80px"
                  _onClick={() => {
                    dispatch(postActions.deletePostDB(post.postId))
                    history.replace("/")
                  }}
                >
                  삭제
                </Button>
                <Button
                  width="80px"
                  margin="0px 5px"
                  _onClick={() => {
                    history.push(`/write/${post.postId}`)
                  }}
                >
                  수정
                </Button>
              </Grid>
            ) : (
              <Button width="100px" _onClick={clickJoin}>
                {
                  // 마감날짜가 지났거나 현재 참여인원수와 최대참여인원수가 같으면서, 현재 참여인원이 아닌 사람은 마감완료 버튼
                  // 아닐 경우나 아닌 사람은 참여 여부에 따라 참여취소또는 참여하기 버튼이 보임.
                  gapDay < 0 ||
                  (post &&
                    post.curMembers.length === post.maxMembers &&
                    !post.curMembers.includes(loginUserName))
                    ? "마감완료"
                    : isJoin
                    ? "참여취소"
                    : "참여하기"
                }
              </Button>
            )}
          </Grid>
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
