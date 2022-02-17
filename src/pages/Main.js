import React from "react"
import styled from "styled-components"
import Post from "../components/Post"
import Banner from "../components/Banner"
import CategoryBar from "../components/CategoryBar"
import { history } from "../redux/configureStore"
import { useDispatch, useSelector } from "react-redux"
import { actionCreators as postActions } from "../redux/modules/post"
import { Grid, Text, Button } from "../elements"
const axios = require("axios")

const Main = (props) => {
  //
  const checkId = useSelector((state) => state.user)
  const dispatch = useDispatch()

  // 노랑 #f6d617  배민 #2ac1bc
  const is_session = localStorage.getItem("token") ? true : false

  React.useEffect(() => {
    dispatch(postActions.getPostDB())
  }, [])

  let post_list = useSelector((state) => state.post.list)

  let [isEndFilter, setIsEndFilter] = React.useState(false)
  const clickEndFilter = () => {
    setIsEndFilter(!isEndFilter)
  }

  return (
    <>
      <CategoryBar></CategoryBar>
      <Banner></Banner>

      <Container>
        <Post_container>
          <ToggleBox>
            <ToggleText>현재 진행중만 보기</ToggleText>
            <ToggleButton onClick={clickEndFilter} isEndFilter={isEndFilter}>
              <Toggle isEndFilter={isEndFilter}></Toggle>
            </ToggleButton>
          </ToggleBox>
          {isEndFilter
            ? post_list
                .filter(
                  (e, i) =>
                    Math.ceil(
                      (new Date(
                        +e.deadLine.slice(0, 4),
                        +e.deadLine.slice(5, 7) - 1,
                        +e.deadLine.slice(8, 10)
                      ).getTime() -
                        new Date().getTime()) /
                        (60 * 1000 * 60 * 24)
                    ) >= 0 && e.curMembers.length !== e.maxMembers
                )
                .map((e, i) => <Post key={i} {...e}></Post>)
            : post_list.map((e, i) => <Post key={i} {...e}></Post>)}
        </Post_container>
        {/* 
        {is_session && (
          <WriteBtn
            onClick={() => {
              history.push("/write")
            }}
          >
            <WriteText>글쓰기</WriteText>
          </WriteBtn>
        )} */}
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
  padding: 10px 10%;
  position: relative;
  overflow-x: hidden;
`
const Post_container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 15px;
  @media only screen and (max-width: 768px) {
    width: 100%;
    justify-content: center;
  }
  position: relative;
`
const ToggleBox = styled.div`
  position: absolute;
  right: 10vw;
  top: -10px;
  z-index: 99;
  display: flex;
  justify-content: center;
  align-items: center;
`
const ToggleButton = styled.div`
  width: 60px;
  height: 30px;
  background-color: ${(props) => (props.isEndFilter ? "#46a1f5;" : "#cccccc;")}
  border-radius: 50px;
  display: flex;
  align-items: center;
  padding: 2px;
`

const Toggle = styled.div`
  width: 27px;
  height: 27px;
  background: white;
  border-radius: 50px;
  position: relative;
  left: ${(props) => (props.isEndFilter ? "28px;" : "null")};
`

const ToggleText = styled.div`
  position: relative;
  margin-right: 8px;
`
export default Main
