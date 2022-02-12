import React from "react"
import { Button, Text, Grid, Input } from "../elements"
import styled from "styled-components"
import Post from "../components/Post"
const Main = (props) => {
  return (
    <>
      <Container>
        <Post_container>
          <Post></Post>
          <Post></Post>
          <Post></Post>
          <Post></Post>
          <Post></Post>
        </Post_container>
      </Container>
    </>
  )
}
const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-item: center;
  margin: 0;
  padding: 0% 8%;
`
const Post_container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;

  @media only screen and (max-width: 768px) {
    width: 100%;
    justify-content: center;
  }
`
export default Main
