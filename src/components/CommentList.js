import React from "react";
import CommentItem from "./CommentItem";
import { useSelector } from "react-redux";

const CommentList = (props) => {
  const commentList = useSelector((state) => state.comment.commentList);

  return (
    <React.Fragment>
      {commentList.map((item, index) => {
        return <CommentItem {...item} index={index} />;
      })}
    </React.Fragment>
  );
};

export default CommentList;
