import React from "react";

import { Grid, Image, Text, Button } from "../elements";
import { history } from "../redux/configureStore";
import Layout from "../elements/Layout";
import { actionCreators as postActions } from "../redux/modules/post";
import { useSelector, useDispatch } from "react-redux";
import LikeBtn from "./LikeBtn";
import { actionCreators as likeActions } from "../redux/modules/like";
import { useEffect } from "react";
const Post = (props) => {
  const { _onClick } = props;
  const dispatch = useDispatch();
  const deletePost = () => {
    dispatch(postActions.deletePostFB(props.id));
  };

  useEffect(() => {
    if (props.is_me) {
      dispatch(likeActions.getLikeFB());
    }
  }, []);

  let like_list = useSelector((state) => state.like.list);

  return (
    <React.Fragment>
      <Grid bg="#FFF" margin="0px 0px 40px 0px" padding="40px">
        <Grid is_flex>
          <Grid is_flex left>
            <Image
              src={
                props.user_info.user_profile
                  ? props.user_info.user_profile
                  : "https://t1.kakaocdn.net/together_image/thumb_person.png"
              }
              shape="circle"
            ></Image>
            <Text bold>{props.user_info.user_name}</Text>
          </Grid>
          {props.is_me && (
            <Button
              padding="4px"
              width="50px"
              margin="4px"
              _onClick={() => {
                history.push(`/write/${props.id}`);
              }}
            >
              수정
            </Button>
          )}

          {props.is_me && (
            <Button
              padding="4px"
              width="50px"
              margin="4px"
              _onClick={deletePost}
            >
              삭제
            </Button>
          )}
        </Grid>
        <Layout layout={props.layout} _onClick={_onClick}>
          <Grid>
            <Image src={props.image_url} shape="rectangle" />
          </Grid>
          <Grid padding="16px" is_flex>
            <Text>{props.contents}</Text>
          </Grid>
        </Layout>
        <LikeBtn like_list={like_list} props={props}></LikeBtn>
        <Grid padding="16px" is_flex>
          <Text margin="0px" bold>
            댓글 {props.comment_cnt}개
          </Text>
          <Text>{props.insert_dt}</Text>
        </Grid>
        {/* <div>user profile / user name / insert_dt / is_me btn (edit btn)</div>
        <div>contents</div>
        <div>image</div>
        <div>comment cnt</div> */}
      </Grid>
    </React.Fragment>
  );
};

Post.defaultProps = {
  user_info: {
    user_name: "sangwon",
    user_profile:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFNOndR8Z4s9bo4Ltu2IKe6hDYCa8pUYbvUg&usqp=CAU",
  },
  image_url: "https://i1.sndcdn.com/artworks-000565263134-tp1vxr-t500x500.jpg",
  contents: "귀엽네여",
  comment_cnt: 10,
  insert_dt: "2022-02-02 04:03",
  is_me: false,
};
export default Post;
