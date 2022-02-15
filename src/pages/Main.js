import React from "react"
import styled from "styled-components"
import Post from "../components/Post"
import CategoryBar from "../components/CategoryBar"
import { history } from "../redux/configureStore"
import { useDispatch, useSelector } from "react-redux"
import { actionCreators as postActions } from "../redux/modules/post"
const axios = require("axios")

const Main = (props) => {
  const dispatch = useDispatch()
  // 노랑 #f6d617  배민 #2ac1bc
  const is_session = localStorage.getItem("token") ? true : false

  React.useEffect(() => {
    dispatch(postActions.getPostDB())
  }, [])

  let post_list = useSelector((state) => state.post.list)

  return (
    <>
      <CategoryBar></CategoryBar>
      <Container>
        <Post_container>
          {post_list.map((e, i) => (
            <Post key={i} {...e}></Post>
          ))}
        </Post_container>

        {is_session && (
          <WriteBtn
            onClick={() => {
              history.push("/write")
            }}
          >
            <WriteText>글쓰기</WriteText>
          </WriteBtn>
        )}
        {/* <WriteBtn
          onClick={() => {
            history.push("/write")
          }}
        >
          <WriteText>글쓰기</WriteText>
        </WriteBtn> */}
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
const Footer = styled.div`
  width: 100%;
  position: fixed;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: end;
  align-items: center;
`
const WriteBtn = styled.div`
  width: 0px;
  height: 0px;
  border-top: 110px solid transparent;
  border-right: 140px solid #2ac1bc;
  position: fixed;
  bottom: 0;
  right: 0;
`
const WriteText = styled.div`
  position: fixed;
  bottom: 25px;
  right: 12px;
  font-size: 18px;
  color: white;
`

export default Main
