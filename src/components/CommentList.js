import React from "react";
import styled from "styled-components";
import { Button, Grid, Input, Text } from "../elements";

const CommentList = () => {
  return (
    <React.Fragment>
      <CommentWrap>
        <div></div>
      </CommentWrap>
    </React.Fragment>
  );
};

CommentList.defaultProps = {};

const CommentWrap = styled.div`
  width: 768px;
  margin-left: auto;
  margin-right: auto;
`;

const UserWrap = styled.div``;

export default CommentList;
