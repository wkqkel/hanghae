import React from "react";
import styled from "styled-components";
import ShareIcon from "@material-ui/icons/Share";

import { Button, Text, Input, Grid } from "../elements";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as PostActions } from "../redux/modules/post";

import { actionCreators as CommonActions } from "../redux/modules/common";

import { Viewer } from "@toast-ui/react-editor";
import { history } from "../redux/configureStore";
import LikeBtn from "../components/LikeBtn";
import CommentWrite from "../components/CommentWrite";
import { actionCreators as LikeActions } from "../redux/modules/like";
import Alert from "../components/Alert";
const Detail = (props) => {
  const postId = props.match.params.postId;
  const postList = useSelector((state) => state.post.list);
  console.log("포스트!!!!!!!!", postList);
  const post = postList.filter((e, i) => e.postId === postId)[0];
  const dispatch = useDispatch();
  const likeList = useSelector((state) => state.like.list);

  React.useEffect(() => {
    // 게시물 삭제하고 바로 또 불러옴.
    if (!post) {
      dispatch(PostActions.getOnePostDB(postId));
    }
    dispatch(CommonActions.saveParams("detail"));
    dispatch(LikeActions.getLikeDB());
  }, []);

  const clickRemove = () => {
    dispatch(PostActions.removePostDB(postId));
  };
  const [isAlert, setIsAlert] = React.useState();
  const isLogin = localStorage.getItem("userId");
  // // 서버에 있는 데이터를 가져와서 store에 저장하고 "useSelector" 활용!
  // React.useEffect(() => {
  //   dispatch(PostActions.getPostDB());
  // }, []);

  //코멘트부분
  //useSelector store에 저장된 state를 가져올 수 있는 역할
  // state.comment.list > 여기서 comment는 configureStore 에 저장된값
  // ㄴlist의 경우, modules > comment 에서 list!!!!
  // const comment_list = useSelector((state) => state.comment.list);
  // console.log(comment_list);
  // 첫번째 comment는 input 박스 입력되어있는값, setComment는 새로 입력한값

  const [comment, setComment] = React.useState();

  //로그인 및 유저ID 같을 때 수정/삭제 버튼 보이게 하는 역할
  // const userId = post.list.userId;
  const local_userId = localStorage.getItem("userId");


  return (
    <React.Fragment>
      {isAlert && <Alert setIsAlert={setIsAlert}></Alert>}
      {post && (
        <Wrap>
          <TitleWrap>
            <Text margin="0px 0px 10px 0px" size="2.25rem" weight="600">
              {post.title}
            </Text>
          </TitleWrap>
          <NicknameWrap>
            <NicknameLeftBox>
              <Text margin="0px 20px 0px 0px" size="16px">
                {post.userId}
              </Text>
              <Text size="16px">{post.pastTime}</Text>
            </NicknameLeftBox>
            {/* 게시물 작성 한 사람과 현재 로그인 된 유저가 같을때에만 보임*/}
            {post["userId"] == local_userId && (
              <Grid is_flex justifyContent="end" width="20%">
                <Text color="#868E96" weight="300" size="15px">
                  통계
                </Text>
                <Text
                  margin="0 10px"
                  color="#868E96"
                  weight="300"
                  size="15px"
                  _onClick={() => {
                    history.push(`/write/${postId}`);
                  }}
                  cursor="pointer"
                >
                  수정
                </Text>
                <Text
                  color="#868E96"
                  weight="300"
                  size="15px"
                  _onClick={() => {
                    clickRemove();
                  }}
                  cursor="pointer"
                >
                  삭제
                </Text>
              </Grid>
            )}
          </NicknameWrap>
          {post.tag.map((e) => (
            <TagCircle>{e}</TagCircle>
          ))}
          <LikeWrap>
            <LikeContainer>
              <LikeBox>
                <Button bg="white" borderRadius="50%">
                  <LikeBtn
                    isLogin={isLogin}
                    setIsAlert={setIsAlert}
                    likeList={likeList}
                    post={post}
                    postId={postId}
                  ></LikeBtn>
                </Button>
                <div>{post.likeCount}</div>
                <Button bg="white" borderRadius="50%">
                  <ShareIcon fontSize="large" color="action" />
                </Button>
              </LikeBox>
            </LikeContainer>
          </LikeWrap>
          {post.thumbnail && <img src={post.thumbnail}></img>}
          {/* <div>{post.content}</div> */}
          <Viewer initialValue={post.contents} />
        </Wrap>
      )}
      <CommentWrite postId={postId} />
    </React.Fragment>
  );
};

// 데이터가 없으면 오류가 나기때문에 디폴트값을 지정해주는 작업
Detail.defaultProps = {
  Title: "안녕하세요, 프론트엔드 신입에 지원합니다. ",
  user_name: "dokyung",
  date: "2022년02월19일",
  hashtag: "개발자가 되려고 결심한 이유",
  likeCount: "200",
  contents:
    "먼저 내가 개발자가 되려고 결심한 이유를 주제로 포스팅하려다 이번에 취업을 준비하면서 신입 FE 면접 내용을 포스팅해보는 게 좋겠다는 생각이 들었다. 그래서 이번 포스팅은 면접에서 받은 질문과 답변 정리!",
  comment: "30",
};

const Wrap = styled.div`
  margin-top: 20px;
  width: 768px;
  /* width: 100%; */
  margin-left: auto;
  margin-right: auto;
  padding: 40px 0;
`;

const TitleWrap = styled.div`
  margin-bottom: 2rem;
  word-break: break-all;
`;

const NicknameWrap = styled.div`
  display: flex;
  justify-content: space-between;
`;
const NicknameLeftBox = styled.div`
  margin: 10px;
  display: flex;
`;

const LikeWrap = styled.div`
  position: relative;
  margin-top: 2rem;
`;

const LikeContainer = styled.div`
  position: fixed;
  top: 300px;
  transform: translateX(-200%);
`;

const LikeBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 8px;
  background: #f8f9fa;
  border: 1px solid #f1f3f5;
  width: 4rem;
  border-radius: 2rem;
  & > :nth-child(2) {
    margin: 8px 0 16px 0;
  }
`;

const TagCircle = styled.div`
  display: inline-block;
  padding: 5px 14px;
  background: #f5f5f5;
  color: #12b886;
  border-radius: 20px;
  margin: 3px;
  font-size: 14px;
`;

export default Detail;
