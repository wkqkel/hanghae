import React from "react";
import CommentItem from "./CommentItem";
import { useSelector } from "react-redux";

const CommentList = (props) => {
  const { setContent } = props;
  const commentList = useSelector((state) => state.comment.commentList);

  return (
    <React.Fragment>
      {commentList.map((item, index) => {
        console.log("와와와아ㅗ아", item);
        return <CommentItem {...item} index={index} setContent={setContent} />;
      })}
    </React.Fragment>
  );
};

export default CommentList;
