import React, { useState } from "react"

import CommentWrite from "../components/CommentWrite"
import CommentList from "../components/CommentList"
import { Grid, Text, Button } from "../elements"
import styled from "styled-components"

import { useSelector, useDispatch } from "react-redux"
import { actionCreators as commentsActions } from "../redux/modules/comments"

const PostDetail = (props) => {
  const dispatch = useDispatch()
  const [comment, setComment] = useState("")

  const id = props.match.params.id
  // console.log(id)

  let userId = localStorage.getItem("userId")
  // console.log(userId)

  // const comment_list = useSelector((state) => state.comments.list)

  const post_list = useSelector((store) => store.post.list)
  const post = post_list.find((p) => p.postId === id)
  console.log(post)

  React.useEffect(() => {
    dispatch(commentsActions.getCommentFB(id))
  }, [])

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
          <Category>{post.category}</Category>
          <Title>{post.title}</Title>
        </Grid>
        <Grid is_flex padding="10px">
          <Text bold>{post.userName}</Text>
          <Text bold>{post.createDate}</Text>
        </Grid>
        <Contents>{post.contents}</Contents>
        <Grid is_flex>
          <Grid width="auto" padding="10px">
            <Grid padding="10px" width="110px">
              <Text>{post.deadLine}</Text>
            </Grid>
          </Grid>
          <Grid is_flex margin="0px 5px">
            <Text>
              {post.curMembers.length} / {post.maxMembers}
            </Text>
            <Button disable width="100px">
              참여하기
            </Button>
          </Grid>
        </Grid>
        <Grid is_flex width="auto">
          {/* <Button disable width="60px" margin="0px 10px">
              수정
            </Button>
            <Button disable width="60px">
              삭제
            </Button> */}
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
