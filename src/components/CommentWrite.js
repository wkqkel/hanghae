import React from "react";
import CommentList from "./CommentList";
import CommentItem from "./CommentItem";

//디자인에 필요한 영역
import styled from "styled-components";
import { Button, Text } from "../elements";

//기능구현에 필요한 영역
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as commentActions } from "../redux/modules/comment";
import { history } from "../redux/configureStore";

const CommentWrite = (props) => {
  //코멘트부분
  // useSelector store에 저장된 state를 가져올 수 있는 역할
  // state.comment.list > 여기서 comment는 configureStore 에 저장된값
  // ㄴlist의 경우, modules > comment 에서 commentList!!!!
  const comment_list = useSelector((state) => state.comment);
  //   console.log(commentList);

  // 첫번째 comment는 input 박스 입력되어있는값, setComment는 새로 입력한값
  const [content, setContent] = React.useState("");
  const dispatch = useDispatch();

  //주소창 뒷부분에 붙는 id 값인데, APP.JS에서 ":postId" 부분과 연결돼
  //주소창에서 무언가 값을 받아올 때는 "params" 라는 키워드를 사용
  //const postId = props.match.params.postId;
  //ㄴ 원래 이렇게 사용했는데, 아래처럼 바꿔준 이유! postId가 Detail 컴포넌트에서 부모요소이기 때문에 아래처럼 바꿔준거야!
  const { postId } = props;
  const userId = localStorage.getItem("userId");
  const is_login = useSelector((state) => state.user.is_login);

  // 서버에 있는 데이터를 가져와서 store에 저장하고 "useSelector" 활용!
  // 저장된 댓글리스트를 가져오는 것 (이부분이 주석처리되면 새로고침해야지만 이전 댓글리스트가 나옴!)
  React.useEffect(() => {
    dispatch(commentActions.getCommentDB(postId));
  }, []);

  //댓글 입력하는 부분
  const onChange = (e) => {
    setContent(e.target.value);
  };

  //댓글입력 버튼 클릭 시 실행되는 함수
  const setAddComment = () => {
    if (content === "") {
      window.alert("내용을 입력해주세요.");
    }
    // if (is_login === false) {
    //   window.alert("로그인 후 이용해 주세요.");
    //   history.push("/login");
    // }

    //백엔드분들과 약속한 형식으로 기재해줘야해 (노션에서 표기값 {comment : String} )
    // string 부분에는 프론트에서 사용자가 입력한 값의 변수를 넣어줘야함
    // 여기는 댓글 인풋박스가 content 변수로 되어있으니깐 content로 넣어준거야
    const comment = { comment: content };
    // dispatch(commentActions.getCommentDB(postId));
    dispatch(commentActions.addCommentDB(postId, comment, userId));

    setContent("");
  };

  return (
    <CommentWrap>
      <Text size="15px" bold margin="30px 0px 15px 0px">
        {/* {commentList?.length} */}
        개의 댓글
      </Text>
      <CommentInput
        type="textarea"
        placeholder="댓글을 입력하세요"
        onChange={onChange}
        value={content}
      ></CommentInput>
      <ButtonSpace>
        <Button
          bg="#12B886"
          shape="rectangle"
          width="100px"
          padding="5px 1.25rem"
          _onClick={setAddComment}
        >
          댓글 작성
        </Button>
      </ButtonSpace>
      <CommentList />
    </CommentWrap>
  );
};

const CommentWrap = styled.div`
  width: 767px;
  margin: auto;
`;

const ButtonSpace = styled.div`
  display: flex;
  -webkit-box-pack: end;
  justify-content: flex-end;
  margin-bottom: 50px;
`;

const CommentInput = styled.textarea`
  font-size: 16px;
  width: 100%;
  padding: 10px 0 0 16px;
  margin: 16px 0 24px 0;
  height: 7.125rem;
  resize: none;
  display: flex;
`;

export default CommentWrite;
