import React from "react"
import { Button, Grid, Input, Text } from "../elements"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPen, faTrashCan } from "@fortawesome/free-solid-svg-icons"

const CommentList = (props) => {
  return (
    <React.Fragment>
      <Grid padding="16px">
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
          <Text margin="0px 10px" bold>
            {user_name}
          </Text>
        </Grid>
        <Grid is_flex margin="0px 5px">
          <Text is_break>{comment}</Text>
        </Grid>
        <Grid is_flex width="auto">
          <FontAwesomeIcon icon={faPen} />
          <FontAwesomeIcon icon={faTrashCan} style={{ margin: "0px 10px" }} />
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
