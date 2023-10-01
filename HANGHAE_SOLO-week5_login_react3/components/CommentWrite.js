import React from "react";
import { Grid, Text, Button, Image, Input } from "../elements";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as commentActions } from "../redux/modules/comment";

const CommentWrite = (props) => {
  const dispatch = useDispatch();
  const [comment_text, setCommentText] = React.useState("");
  const { post_id } = props;
  const onChange = (e) => {
    setCommentText(e.target.value);
  };

  const write = () => {
    if (comment_text === "") {
      window.alert("댓글을 입력해주세요");
      return;
    }
    dispatch(commentActions.addCommentFB(post_id, comment_text));
    setCommentText("");
    // 인풋 태그에 밸류값줘서 버튼 클릭시 날라가게 하려고.
  };
  return (
    <>
      <Grid padding="16px" is_flex>
        <Input
          placeholder="댓글내용을 입력해주세요 :)"
          _onChange={onChange}
          onSubmit={write}
          value={comment_text}
          is_submit
        ></Input>
        <Button width="50px" margin="0px 2px 0px 2px" _onClick={write}>
          작성
        </Button>
      </Grid>
    </>
  );
};
export default CommentWrite;
