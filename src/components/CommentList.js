import React from "react"
import { Button, Grid, Input, Text } from "../elements"

const CommentList = (props) => {
  return (
    <React.Fragment>
      <Grid padding="16px">
        <CommentItem />
        <CommentItem />
        <CommentItem />
        <CommentItem />
        <CommentItem />
        <CommentItem />
      </Grid>
    </React.Fragment>
  )
}

export default CommentList

const CommentItem = (props) => {
  const { user_profile, user_name, user_id, post_id, comment } = props
  return (
    <React.Fragment>
      <Grid is_flex margin="10px 0px">
        <Grid is_flex width="auto">
          <Text bold>{user_name}</Text>
        </Grid>
        <Grid is_flex margin="0px 5px">
          <Text is_break>{comment}</Text>
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
    </React.Fragment>
  )
}

CommentItem.defaultProps = {
  user_profile: "",
  user_name: "test1",
  user_id: "",
  post_id: 1,
  comment: "내용을 입력해보까여?",
}
