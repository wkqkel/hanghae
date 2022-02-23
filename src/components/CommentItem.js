import React from "react";
import styled from "styled-components";

import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

import { actionCreators as commentAction } from "../redux/modules/comment";

const CommentItem = (props) => {
  // CommentList.js에서 {...item}에서 이미 가져오고 있는 값! consols.log로 {...item} 값에 뭐가 있는지 확인하고 아래에서 props { }에  넣어주기
  // const { commentId, nickname, content, regdate, index } = props;
  const { userId, comment, pastTime, commentId } = props;
  const dispatch = useDispatch();
  //댓글유저ID 확인 함수

  const is_login = useSelector((state) => state.user.is_login);
  const local_userId = localStorage.getItem("userId");
  // console.log(local_userId);
  console.log("ddddddd", props.userId);
  // console.log(userId);
  React.useEffect(() => {}, [is_login]);

  //정말 삭제 할껀지 물어보는 !
  const removeComment = () => {
    const result = window.confirm("댓글을 정말로 삭제하시겠습니까?");

    if (result) {
      dispatch(commentAction.removeCommentDB(commentId));
    }
  };

  if (local_userId === userId)
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
              <div>{userId}</div>
              <div>{pastTime}</div>
            </NicknameDateBox>

            <Edit>
              <span onClick={removeComment}>삭제</span>
            </Edit>
          </LeftBox>
          <TextBox>{comment}</TextBox>
        </CommentWrap>
      </React.Fragment>
    );

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
            <div>{userId}</div>
            <div>{pastTime}</div>
          </NicknameDateBox>
        </LeftBox>
        <TextBox>{comment}</TextBox>
      </CommentWrap>
    </React.Fragment>
  );
};

// CommentItem.defaultProps = {
//   userId: "dokyung",
//   date: "2022년02월19일",
//   content: "글이 너무 좋아요! 저도 꼭 프론트엔드 개발자가 되고 싶어요 ",
// };

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

const Edit = styled.div`
  display: flex;
  margin-left: auto;
  span {
    cursor: pointer;
    font-size: 0.875rem;
    color: rgb(134, 142, 150);
    margin-left: 0.5rem;
    :hover {
      text-decoration: underline;
      color: #b0b5c3;
    }
  }
`;

export default CommentItem;
