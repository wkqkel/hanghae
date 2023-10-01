import React from "react";
import styled from "styled-components";

import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

import { actionCreators as commentAction } from "../redux/modules/comment";
import { Button } from "@material-ui/core";

const CommentItem = (props) => {
  // CommentList.js에서 {...item}에서 이미 가져오고 있는 값! consols.log로 {...item} 값에 뭐가 있는지 확인하고 아래에서 props { }에  넣어주기
  const { userId, comment, pastTime, commentId, postId, setContent } = props;
  const dispatch = useDispatch();
  //댓글유저ID 확인 함수

  const is_login = useSelector((state) => state.user.is_login);
  const local_userId = localStorage.getItem("userId");

  // console.log(userId);
  React.useEffect(() => {}, [is_login]);

  //정말 삭제 할껀지 물어보는 !
  const removeComment = () => {
    const result = window.alert("댓글을 정말로 삭제하시겠습니까?");

    if (result) {
      dispatch(commentAction.removeCommentDB(commentId));
    }
  };

  // 댓글 수정하기
  // 수정버튼클릭하면, 새로운 input박스를 보여줘서 수정하는 방식
  // 인풋박스 & 코멘트박스에 id값을 먼저준 다음에 해당 값을 document로 찾아서 변수로 저장
  // React.useState(comment) > 여기서 comment 부분은 처음 입력된 값을 가져오기 위함
  const [editComment, setEditComment] = React.useState(comment);
  const changeDisplay = () => {
    const commentBox = document.getElementById("commentBox");
    const editInput = document.getElementById("editInput");
    const editButton = document.getElementById("editButton");
    const cancelButton = document.getElementById("cancelButton");
    const editDeleteButton = document.getElementById("editDeleteButton");

    commentBox.style.display = "none";
    editInput.style.display = "block";
    cancelButton.style.display = "block";
    editButton.style.display = "block";
    editDeleteButton.style.display = "none";
  };

  //코멘트 수정 하는 부분
  const onChange = (e) => {
    setEditComment(e.target.value);
  };

  //수정버튼;
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
            <Edit id="editDeleteButton">
              <span onClick={changeDisplay}>수정</span>
              <span onClick={removeComment}>삭제</span>
            </Edit>
            <CommentInput
              id="editInput"
              type="textarea"
              placeholder="댓글을 입력하세요"
              onChange={onChange}
              value={editComment}
            ></CommentInput>
          </LeftBox>
          <TextBox id="commentBox">{comment}</TextBox>
          <EditButton
            id="editButton"
            onClick={() => {
              dispatch(
                commentAction.editCommnetDB(postId, editComment, commentId)
              );
            }}
          >
            댓글수정
          </EditButton>

          <EditButton id="cancelButton" onClick={() => {}}>
            취소
          </EditButton>
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

const CommentInput = styled.textarea`
  font-size: 16px;
  width: 100%;
  padding: 10px 0 0 16px;
  margin: 16px 0 24px 0;
  height: 7.125rem;
  resize: none;
  display: none;
`;

const EditButton = styled.button`
  display: none;
  background-color: #12b886;
  width: 100px;
  padding: 5px 1.25rem;
  float: right;
  color: white;
  border-radius: 8px;
  border-color: white;
`;
export default CommentItem;
