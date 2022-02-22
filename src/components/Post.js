import React from "react";
import { Button, Grid, Input, Text } from "../elements";
import styled from "styled-components";
import { FaHeart } from "react-icons/fa";
import ProfileImg from "./ProfileImg";
import { history } from "../redux/configureStore";

const Post = (props) => {
  const {
    commentCnt,
    contents,
    createAt,
    introduce,
    postId,
    tag,
    thumbnail,
    title,
    userId,
    pastTime,
  } = props;
  return (
    <>
      <PostBox
        onClick={() => {
          history.push(`/detail/${postId}`);
        }}
      >
        <Thumnail style={{ cursor: "pointer" }} thumbnail={thumbnail}>
          {/* <img></img> */}
        </Thumnail>

        <CenterBox>
          <div style={{ cursor: "pointer" }}>
            <Text weight="500" size="16px" margin="0 0 2px 0" color="#212529">
              {title.length > 15 ? title.slice(0, 15) + "..." : title}
            </Text>
            <Text weight="300" margin="0 0 24px 0" color="#495057">
              {introduce.length > 55
                ? introduce.slice(0, 55) + "..."
                : introduce}
              {/* {!introduce && contents.length > 55
                ? contents.slice(0, 55) + "..."
                : contents} */}
            </Text>
          </div>
          <Text size="12px" color="#868E96" weight="200">
            {`${pastTime} · ${commentCnt}개의 댓글`}
          </Text>
        </CenterBox>
        <BottomBox>
          <ProfileBox style={{ cursor: "pointer" }}>
            <ProfileImg></ProfileImg>
            <Text size="12px">
              <span style={{ color: "#868E96", fontWeight: "200" }}>by </span>
              {userId}
            </Text>
          </ProfileBox>
          <LikeBox>
            <FaHeart />
            <Text margin="0 0  0 5px  " size="12px" weight="300">
              141
            </Text>
          </LikeBox>
        </BottomBox>
      </PostBox>
    </>
  );
};

const PostBox = styled.div`
  background: white;
  border-radius: 4px;
  height: 340px;
  margin: 16px;
  box-shadow: 0 0px 20px 1px rgba(0, 0, 0, 0.05);
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 14px rgba(0, 0, 0, 0.1);
    transition: transform 0.4s, translateY ease-out;
  }
  @media screen and (max-width: 1056px) {
    height: 93%;
  }
`;

const Thumnail = styled.div`
  background-image: ${(props) =>
    props.thumbnail
      ? `url(${props.thumbnail})`
      : `url(
          "https://media.vlpt.us/images/ohzzi/post/5623ffdb-7aac-4920-b1f5-b6d4fdf044cd/image.png?w=640"
        )`};
  padding-top: 52%;
  background-size: cover;
  background-position: center;
  height: 0;
  border-radius: 4px 4px 0px 0px;
`;

const CenterBox = styled.div`
  height: 150px;
  padding: 14px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const BottomBox = styled.div`
  height: 40px;
  padding: 14px;
  border-top: 1px solid #f1f3f5;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-top: 1px solid #f1f3f5;
`;

const ProfileBox = styled.div`
  display: flex;
  align-items: center;
  height: 18px;
`;

const LikeBox = styled.div`
  display: flex;
  align-items: center;
  font-size: 10px;
`;

export default Post;
