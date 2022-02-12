import React from "react"

import CommentWrite from "../components/CommentWrite"
import CommentList from "../components/CommentList"
import { Grid } from "../elements"
import styled from "styled-components"

const PostDetail = (props) => {
  return (
    <Container>
      <Grid></Grid>
      <CommentWrite />
      <CommentList />
    </Container>
  )
}

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0;
  padding: 0% 15%;
  @media only screen and (max-width: 768px) {
    padding: 0% 3%;
  }
`
export default PostDetail
