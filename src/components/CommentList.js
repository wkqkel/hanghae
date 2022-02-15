import React, { useState, useEffect, useRef } from "react"
import { Button, Grid, Input, Text } from "../elements"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPen, faTrashCan } from "@fortawesome/free-solid-svg-icons"

import { useDispatch, useSelector } from "react-redux"
import { actionCreators as commentsActions } from "../redux/modules/comments"

const CommentList = (props) => {
  const dispatch = useDispatch()

  const loginUserId = localStorage.getItem("loginUserId")
  const loginUserName = localStorage.getItem("loginUserName")

  const { postId } = props
  // 댓글 작성자만 삭제 및 수정 가능하게
  const comment_list = useSelector((state) => state.comments.list)

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
  console.log("props1111", props)
  const dispatch = useDispatch()

  let [input, setInput] = useState()
  const [editable, setEditable] = useState(false)

  const handleChange = (e) => {
    setInput(e.target.value)
  }
  const editOn = () => {
    setEditable(true)
    setInput(content)
  }

  const { userName, userId, postId, content, commentId } = props
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
        <Grid is_flex width="auto">
          <Text margin="0px 10px" bold>
            {userName}
          </Text>
        </Grid>
        <Grid is_flex margin="0px 5px">
          <Text is_break>
            {editable ? (
              <Grid is_flex>
                <input
                  type="text"
                  value={input}
                  onChange={handleChange}
                  onKeyDown={handleKeydown}
                />
                <Button
                  margin="0px 10px"
                  padding=" 2px 10px"
                  _onClick={editComment}
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
