import React from "react";
import { Button, Grid, Input, Text } from "../elements";
import styled from "styled-components";
import { FaHeart } from "react-icons/fa";
import ProfileImg from "./ProfileImg";

const Post = () => {
  return (
    <>
      <PostBox>
        <Thumnail style={{ cursor: "pointer" }}>
          <img></img>
        </Thumnail>

        <CenterBox>
          <div style={{ cursor: "pointer" }}>
            <Text weight="500" size="16px" color="#212529">
              안녕하세요, 프론트엔드 신입에 지원...
            </Text>
            <Text weight="300" margin="0 0 24px 0">
              개발자가 되려고 결심한 이유 그리고 신입 프론트엔드 개발자로 취업을
              준비하며 면접에서 받은 질문과 답변 총정리
            </Text>
          </div>
          <Text size="12px" color="#868E96">
            2022년 2월 10일 · 12개의 댓글
          </Text>
        </CenterBox>
        <BottomBox>
          <ProfileBox style={{ cursor: "pointer" }}>
            <ProfileImg></ProfileImg>
            <Text size="12px">
              <span style={{ color: "#868E96" }}>by </span>heyiminhye
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
  height: 360px;
  margin: 16px;
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
  background-image: url("https://media.vlpt.us/images/heekang/post/11cf82da-7c7f-4db4-a57b-9d1bb7ed6bde/Hnet-image.gif?w=640");
  padding-top: 52%;
  background-size: cover;
  height: 0;
  border-radius: 4px 4px 0px 0px;
`;

const CenterBox = styled.div`
  height: 165px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const BottomBox = styled.div`
  height: 45px;
  padding: 16px;
  border-top: 1px solid #f1f3f5;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
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
