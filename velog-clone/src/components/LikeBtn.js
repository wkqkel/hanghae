import React from "react";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { actionCreators as LikeActions } from "../redux/modules/like";
import { useDispatch, useSelector } from "react-redux";

const LikeBtn = (props) => {
  const dispatch = useDispatch();

  //   console.log(likeList);
  // 좋아요 토글
  const [isLike, setIsLike] = React.useState(false);
  const clickLike = () => {
    if (!props.isLogin) {
      props.setIsAlert(true);
      return;
    }
    if (isLike) {
      dispatch(LikeActions.deleteLikeDB(props.postId));
      // 좋아요취소
    } else {
      dispatch(LikeActions.addLikeDB(props.postId));
    }
    setIsLike(!isLike);
  };

  React.useEffect(() => {
    if (props.likeList.includes(props.postId)) {
      setIsLike(true);
    }
  }, [props.likeList]);
  return (
    <div>
      <FavoriteIcon
        fontSize="large"
        color="action"
        style={{ color: isLike ? "#12B886" : "" }}
        onClick={() => {
          clickLike();
        }}
      />
    </div>
  );
};

export default LikeBtn;
