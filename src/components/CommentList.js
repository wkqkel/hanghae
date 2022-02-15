import React, { useState } from "react"
import { Button, Grid, Input, Text } from "../elements"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPen, faTrashCan } from "@fortawesome/free-solid-svg-icons"

import { useDispatch, useSelector } from "react-redux"
import { actionCreators as commentsActions } from "../redux/modules/comments"

const CommentList = (props) => {
  const dispatch = useDispatch()
  const comment_list = useSelector((state) => state.comments.list)
  console.log("comment_list", comment_list)
  console.log("props", props)
  const { postId } = props
  console.log(postId)

  React.useEffect(() => {
    dispatch(commentsActions.getCommentFB(postId))
    console.log("updated")
  }, [])

  if (!comment_list[postId]) {
    return null
  }

  return (
    <React.Fragment>
      <Grid padding="16px">
        {comment_list[postId].map((c, i) => {
          return <CommentItem key={i} {...c} />
        })}
      </Grid>
    </React.Fragment>
  )
}

CommentList.defaultProps = {
  postId: null,
}

export default CommentList

const CommentItem = (props) => {
  const dispatch = useDispatch()

  let [input, setInput] = useState()

  const handleClick = () => {
    setInput(content)
  }
  const handleChange = (e) => {
    setInput(e.target.value)
  }
  const { userName, userId, postId, content, commentId } = props
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
            {input ? (
              <input type="text" value={input} onChange={handleChange} />
            ) : (
              content
            )}
          </Text>
        </Grid>
        <Grid is_flex width="auto">
          <FontAwesomeIcon icon={faPen} onClick={handleClick} />
          <FontAwesomeIcon
            icon={faTrashCan}
            style={{ margin: "0px 10px" }}
            onClick={deleteComment}
          />
        </Grid>
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
