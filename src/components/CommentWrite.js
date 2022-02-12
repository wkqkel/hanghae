import React from "react"
import { Grid, Input, Button, Text } from "../elements"

const CommentWrite = (props) => {
  return (
    <React.Fragment>
      <Grid padding="16px" is_flex>
        <Input placeholder=" 댓글을 입력해주세요:)" />
        <Button disable width="100px" margin="0px 3px 0px 3px" padding="14px">
          작성
        </Button>
      </Grid>
    </React.Fragment>
  )
}

export default CommentWrite
