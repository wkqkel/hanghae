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
  const logout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("userId")
    window.location.href = "/"
  }
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
                <Text color="#000" bold size="26px" padding="0px 15%">
                  모<span style={{ fontSize: "24px" }}>임</span>
                  <span style={{ fontSize: "23px" }}>
                    의<br />
                  </span>
                  민<span style={{ fontSize: "24px" }}>족</span>
                </Text>
              </TitleBox>
            </Grid>
            <Grid is_flex width="auto" padding="0px 10%">
              <Button margin="10px" width="100px" _onClick={logout}>
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
              <Text color="#000" bold size="26px" padding="0px 15%">
                모<span style={{ fontSize: "24px" }}>임</span>
                <span style={{ fontSize: "23px" }}>
                  의<br />
                </span>
                민<span style={{ fontSize: "24px" }}>족</span>
              </Text>
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
  word-break: keep-all;
`
export default Header
