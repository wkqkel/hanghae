import React from "react"
import { Button, Text, Grid, Input } from "../elements"
import styled from "styled-components"
import Post from "../components/Post"
import CategoryBar from "../components/CategoryBar"

const Main = (props) => {
  return (
    <>
      <CategoryBar></CategoryBar>
      <Container>
        <Post_container>
          <Post></Post>
          <Post></Post>
          <Post></Post>
          <Post></Post>
          <Post></Post>
          <Post></Post>
          <Post></Post>
          <Post></Post>
          <Post></Post>
          <Post></Post>
          <Post></Post>
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
  display: column;
  justify-content: center;
  align-items: center;
  margin: 0;
  padding: 1% 10%;
  position: relative;
  overflow-x: hidden;
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
