import React from "react";
import { Grid, Text, Image } from "../elements";

const Card = (props) => {
  const { image_url, user_name, post_id } = props;
  console.log(image_url);
  return (
    <>
      <Grid padding="16px" is_flex bg="#fff">
        <Grid width="auto" margin="0px 8px 0px 0px">
          <Image size="85" shape="square" image_url={image_url}></Image>
        </Grid>
        <Grid>
          <Text>
            <b>{user_name}</b>
          </Text>
          님이 게시글에 댓글을 남겼어요 :(
        </Grid>
      </Grid>
    </>
  );
};

Card.defaultProps = {
  image_url: "",
  user_name: "",
  post_id: null,
};
export default Card;
