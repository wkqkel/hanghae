// PostList.js
import React from "react";
import Post from "../components/Post";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators as postActions } from "../redux/modules/post";
import { actionCreators as likeActions } from "../redux/modules/like";
import InfinityScroll from "../shared/InfinityScroll";
import { Grid } from "../elements";
import { apiKey } from "../shared/firebase";

//React.Fraggment는 <>와 같은 역할.
const PostList = (props) => {
  const dispatch = useDispatch();
  const post_list = useSelector((state) => state.post.list);
  const user_info = useSelector((state) => state.user.user);
  const is_loading = useSelector((state) => state.post.is_loading);
  const paging = useSelector((state) => state.post.paging);
  const { history } = props;

  React.useEffect(() => {
    if (post_list.length < 2) {
      dispatch(postActions.getPostFB());
    }
  }, []);

  return (
    <React.Fragment>
      {/* <Post /> */}

      <Grid bg="#Eff6FF" padding="20px 30%">
        <InfinityScroll
          callNext={() => {
            dispatch(postActions.getPostFB(paging.next));
          }}
          is_next={paging.next ? true : false}
          loading={is_loading}
        >
          {post_list.map((e, i) => {
            // if (user_info && e.user_info.user_id === user_info.uid) {
            // console.log(post_list);
            if (e.user_info.user_id === user_info?.uid) {
              return (
                <Grid key={e.id}>
                  <Post
                    _onClick={() => {
                      history.push(`/post/${e.id}`);
                    }}
                    {...e}
                    is_me
                  ></Post>
                </Grid>
              );
            }
            return (
              <Grid key={e.id}>
                <Post
                  _onClick={() => {
                    history.push(`/post/${e.id}`);
                  }}
                  {...e}
                ></Post>
              </Grid>
            );
          })}
        </InfinityScroll>
      </Grid>
    </React.Fragment>
  );
};
export default PostList;
