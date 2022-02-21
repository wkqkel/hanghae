import React from "react";
import { Button, Grid, Input, Text } from "../elements";
import styled from "styled-components";
import { FaHeart } from "react-icons/fa";
import Post from "../components/Post";

const Main = () => {
  return (
    <>
      <Container>
        <PostList>
          <Post></Post>
          <Post></Post>
          <Post></Post>
          <Post></Post>
          <Post></Post>
          <Post></Post>
        </PostList>
      </Container>
    </>
  );
};
const Container = styled.div`
  width: 100%;
  background: #f8f9fa;
  height: 100%;
  display: flex;
`;
const PostList = styled.div`
  margin: 24px auto;
  display: grid;
  grid-template-columns: repeat(5, 320px);
  @media screen and (max-width: 1720px) {
    grid-template-columns: repeat(4, 320px);
  }
  @media screen and (max-width: 1440px) {
    grid-template-columns: repeat(3, 320px);
  }
  @media screen and (max-width: 1056px) {
    width: 100%;
    grid-template-columns: repeat(2, 1fr);
  }
  @media screen and (max-width: 767px) {
    width: 100%;
    grid-template-columns: repeat(1, 1fr);
  }
`;

export default Main;
