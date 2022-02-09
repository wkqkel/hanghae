import React from "react";
import { FaHeart } from "react-icons/fa";
import styled from "styled-components";
import { Text, Grid } from "../elements";
import { actionCreators as likeActions } from "../redux/modules/like";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { apiKey } from "../shared/firebase";

const LikeBtn = (props) => {
  const dispatch = useDispatch();
  const user_info = useSelector((state) => state.user.user);
  const _session_key = `firebase:authUser:${apiKey}:[DEFAULT]`;
  const is_session = sessionStorage.getItem(_session_key) ? true : false;
  const [is_like, setIsLike] = React.useState("");
  const like_list = props.like_list[user_info?.uid]
    ? props.like_list[user_info?.uid]
    : [];

  useEffect(() => {
    if (like_list.includes(props.props.id)) {
      setIsLike(true);
    }
  }, [like_list]);

  const clickLike = () => {
    if (!is_session) {
      alert("로그인하셔야 해요");
      return;
    }
    if (is_like) {
      dispatch(likeActions.deleteLikeFB(props.props.id));
      setIsLike(!is_like);
    } else {
      setIsLike(!is_like);
      dispatch(likeActions.addLikeFB(props.props.id));
    }
  };
  return (
    <LikeBox is_like={is_like}>
      <FaHeart className="likeBtn" onClick={clickLike}></FaHeart>
      <Text size="16px">
        Like {props.props.like_cnt ? props.props.like_cnt : 0}명
      </Text>
    </LikeBox>
  );
};
const LikeBox = styled.div`
  font-size: 30px;
  display: flex;
  align-items: center;
  margin-left: 10px;
  ${(props) => (props.is_like ? "color:red;" : null)}
  .likeBtn {
    margin-right: 10px;
  }
`;
export default LikeBtn;
