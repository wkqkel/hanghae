import React, { useState } from "react"
import { Button, Grid, Text, Input } from "../elements"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPen, faTrashCan } from "@fortawesome/free-solid-svg-icons"

import { useDispatch, useSelector } from "react-redux"
import { actionCreators as commentsActions } from "../redux/modules/comments"

const CommentList = (props) => {
  const dispatch = useDispatch()

  const loginUserId = localStorage.getItem("loginUserId")
  const loginUserName = localStorage.getItem("loginUserName")

  const comment_list = useSelector((state) => state.comments.list)
  const { postId } = props
  // 댓글 작성자만 삭제 및 수정 가능하게

  React.useEffect(() => {
    dispatch(commentsActions.getCommentFB(postId))
  }, [])
  if (!comment_list[postId]) {
    return null
  }

  return (
    <React.Fragment>
      <Grid padding="16px">
        {comment_list[postId].map((c, i) => {
          return <CommentItem key={i} {...c} is_me={c.userId === loginUserId} />
        })}
      </Grid>
    </React.Fragment>
  )
}

CommentList.defaultProps = {
  postId: null,
  is_me: false,
}

export default CommentList

const CommentItem = (props) => {
  const dispatch = useDispatch()

  const { userName, userId, postId, content, commentId } = props

  let [input, setInput] = useState()
  const [editable, setEditable] = useState(false)

  const handleChange = (e) => {
    setInput(e.target.value)
  }

  const editOn = () => {
    setEditable(true)
    setInput(content)
  }

  const handleKeydown = (e) => {
    if (e.key === "Enter") {
      editComment()
    }
  }

  //댓글 수정하기
  const editComment = () => {
    let content = {
      userId: userId,
      userName: userName,
      content: input,
    }
    dispatch(commentsActions.editCommentDB(postId, commentId, content))
    setEditable(!editable)
  }

  //댓글 삭제하기
  const deleteComment = () => {
    dispatch(commentsActions.deleteCommentDB(postId, commentId))
  }

  return (
    <React.Fragment>
      <Grid is_flex margin="10px 0px">
        <Grid is_flex width="100px">
          <Text margin="0px 10px" bold>
            {userName}
          </Text>
        </Grid>
        <Grid is_flex margin="0px 5px">
          <Text is_break>
            {editable ? (
              <Grid is_flex>
                <Input
                  type="text"
                  value={input}
                  _onChange={handleChange}
                  _onKeyDown={handleKeydown}
                  width="50vw"
                />
                <Button
                  margin="0px 10px"
                  padding=" 13px 10px"
                  _onClick={editComment}
                  width="5vw"
                >
                  수정
                </Button>
              </Grid>
            ) : (
              content
            )}
          </Text>
        </Grid>
        {props.is_me ? (
          <Grid is_flex width="auto">
            <FontAwesomeIcon icon={faPen} onClick={editOn} />
            <FontAwesomeIcon
              icon={faTrashCan}
              style={{ margin: "0px 10px" }}
              onClick={deleteComment}
            />
          </Grid>
        ) : (
          console.log("false")
        )}
      </Grid>
    </React.Fragment>
  )
}

CommentItem.defaultProps = {
  userName: "test1",
  userId: "",
  postId: "1",
  content: "내용을 입력해보까여?",
}
