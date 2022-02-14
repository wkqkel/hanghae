import React from "react"
import { Grid, Input, Button, Text } from "../elements"

const CommentWrite = (props) => {
  const [comment_text, setCommentText] = React.useState("")

  const onChange = (e) => {
    setCommentText(e.target.value)
  }

  const write = () => {
    console.log(comment_text)
    setCommentText("")
  }
  return (
    <React.Fragment>
      <Grid padding="16px" is_flex>
        <Input
          value={comment_text}
          placeholder=" 댓글을 입력해주세요:)"
          _onChange={onChange}
        />
        <Button
          disable
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
