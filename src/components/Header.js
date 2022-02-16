import React from "react"
import styled from "styled-components"
import { Button, Text, Grid } from "../elements"
import { history } from "../redux/configureStore"
import { getCookie, deleteCokokie, deleteCookie } from "../shared/Cookie"

import { useSelector, useDispatch } from "react-redux"
import { actionCreators as userActions } from "../redux/modules/user"
import { actionCreators as postActions } from "../redux/modules/post"

const Header = (props) => {
  const dispatch = useDispatch()
  const is_session = localStorage.getItem("token") ? true : false
  // const is_login = useSelector((state) => state.user.is_login)

  if (is_session) {
    return (
      <React.Fragment>
        <Grid
          padding="8px 20px"
          width="100vw"
          is_flex
          borderBottom="1px solid rgba(0,0,0,0.2)"
        >
          <Grid is_flex>
            <Grid>
              <TitleBox
                onClick={() => {
                  history.push("/")
                  dispatch(postActions.getPostDB())
                }}
              >
                <img
                  width="70px"
                  src="https://firebasestorage.googleapis.com/v0/b/megazine-11a01.appspot.com/o/images%2F%EB%AA%A8%EC%9E%84%EC%9D%98%EB%AF%BC%EC%A1%B1logo.png?alt=media&token=d52ed5f9-1798-4465-ae13-3108fc3da79d"
                />
                {/* <Text color="#000" bold size="26px" padding="0px 15%">
                  모<span style={{ fontSize: "24px" }}>임</span>
                  <span style={{ fontSize: "23px" }}>
                    의<br />
                  </span>
                  민<span style={{ fontSize: "24px" }}>족</span>
                </Text> */}
              </TitleBox>
            </Grid>
            <Grid is_flex width="auto" padding="0px 10%">
              <Button
                margin="10px"
                width="100px"
                _onClick={() => {
                  dispatch(userActions.logOut())
                  window.location.href = "/"
                }}
              >
                로그아웃
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </React.Fragment>
    )
  }

  return (
    <React.Fragment>
      <Grid
        padding="8px 20px"
        width="100vw"
        is_flex
        borderBottom="1px solid rgba(0,0,0,0.2)"
      >
        <Grid is_flex>
          <Grid>
            <TitleBox
              onClick={() => {
                history.push("/")
                dispatch(postActions.getPostDB())
              }}
            >
              <img
                width="70px"
                src="https://firebasestorage.googleapis.com/v0/b/megazine-11a01.appspot.com/o/images%2F%EB%AA%A8%EC%9E%84%EC%9D%98%EB%AF%BC%EC%A1%B1logo.png?alt=media&token=d52ed5f9-1798-4465-ae13-3108fc3da79d"
              />
              {/* <Text color="#000" bold size="26px" padding="0px 15%">
                모<span style={{ fontSize: "24px" }}>임</span>
                <span style={{ fontSize: "23px" }}>
                  의<br />
                </span>
                민<span style={{ fontSize: "24px" }}>족</span>
              </Text> */}
            </TitleBox>
          </Grid>
          <Grid is_flex width="auto" padding="0px 10%">
            <Button
              margin="10px"
              width="100px"
              _onClick={() => {
                history.push("/login")
              }}
            >
              로그인
            </Button>
            <Button
              width="100px"
              _onClick={() => {
                history.push("/signup")
              }}
            >
              회원가입
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  )
}
const TitleBox = styled.div`
  padding: 0px 15%;
  word-break: keep-all;
`
export default Header
