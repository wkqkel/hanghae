import React from "react";
import styled from "styled-components";

const CommentList = (props) => {
  return (
    <React.Fragment>
      <CommentWrap>
        <LeftBox>
          <Image>
            <img
              shape="circle"
              src="https://velog-s3.s3.ap-northeast-2.amazonaws.com/profiles/default.svg"
            ></img>
          </Image>
          <NicknameDateBox>
            <div>{props.user_name}</div>
            <div>{props.date}</div>
          </NicknameDateBox>
        </LeftBox>
        <TextBox>{props.textbox}</TextBox>
      </CommentWrap>
    </React.Fragment>
  );
};

CommentList.defaultProps = {
  user_name: "dokyung",
  date: "2022년02월19일",
  textbox: "글이 너무 좋아요! 저도 꼭 프론트엔드 개발자가 되고 싶어요 ",
};

const CommentWrap = styled.div`
  width: 768px;
  margin-left: auto;
  margin-right: auto;
  border-bottom: 1px solid #f1f3f5;
`;

const LeftBox = styled.div`
  display: flex;
  margin-top: 15px;
`;

const Image = styled.div`
  width: 2.5rem;
  height: 2.5rem;
  margin: 10px;
`;

const NicknameDateBox = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 5px;
`;

const TextBox = styled.div`
  margin-left: 16px;
  margin-top: 16px;
  margin-bottom: 25px;
`;

export default CommentList;
