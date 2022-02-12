import React from "react"
import { Button, Text, Grid, Input } from "../elements"
import styled from "styled-components"
const Postwrite = (props) => {
  return (
    <>
      <Container>
        <Grid is_flex>
          <Grid width="20%" margin="0px 20px 20px 0px">
            <Input label="카테고리"></Input>
          </Grid>
          <Grid margin="0px 0px 20px 0px">
            <Input label="제목"></Input>
          </Grid>
        </Grid>
        <Grid is_flex padding="10px">
          <Text color="white">작성자</Text>
          <Text color="white">게시글 작성일자</Text>
        </Grid>
        <Grid>
          <textarea
            type="textarea"
            style={{ height: "60vh", width: "100%", resize: "none" }}
          />
        </Grid>

        <Grid is_flex class="bottom-box">
          <Grid is_flex width="20%">
            <Input placeholder="작성일자" label={false}></Input>
            <Input placeholder="모집인원" label={false}></Input>
          </Grid>
          <Grid is_flex width="10vw">
            <Button>작성하기</Button>
            <Button>수정하기</Button>
          </Grid>
        </Grid>
      </Container>
    </>
  )
}
const Container = styled.div`
  width: 100%;
  display: column;
  justify-content: center;
  align-item: center;
  margin: 0;
  padding: 50px 20%;
  * {
    border-radius: 14px;
  }
  Button {
    width: 100px;
    background-color: white;
    color: black;
    border: 1px solid black;
  }
  Button:hover {
    background-color: black;
    color: white;
  }
`

export default Postwrite
