import React from "react"
import { Grid, Input, Button, Text } from "../elements"
import { useDispatch } from "react-redux"
import { actionCreators as commentsActions } from "../redux/modules/comments"

const CommentWrite = (props) => {
  const dispatch = useDispatch()
  const [comment, setComment] = React.useState("")

  const loginUserId = localStorage.getItem("loginUserId")
  const loginUserName = localStorage.getItem("loginUserName")

  const { postId } = props

  // const postId = props.match.params.id

  const onChange = (e) => {
    setComment(e.target.value)
  }

  //댓글 작성하기
  const write = () => {
    let content = {
      postId: postId,
      userId: loginUserId,
      userName: loginUserName,
      content: comment,
    }
    dispatch(commentsActions.addCommentDB(postId, content))
    setComment("")
  }
  return (
    <React.Fragment>
      <Grid padding="16px" is_flex>
        <Input
          value={comment}
          placeholder=" 댓글을 입력해주세요:)"
          _onChange={onChange}
        />
        <Button
          width="100px"
          margin="0px 3px 0px 3px"
          padding="14px"
          _onClick={write}
          text="작성"
        ></Button>
      </Grid>
    </React.Fragment>
  )
}

export default CommentWrite
