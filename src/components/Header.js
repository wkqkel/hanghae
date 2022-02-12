import React from "react"
import styled from "styled-components"
import { Button, Text, Grid, Input } from "../elements"
import { history } from "../redux/configureStore"

const Header = (props) => {
  return (
    <>
      <Grid
        padding="8px 20px"
        width="100vw"
        is_flex
        borderBottom="1px solid rgba(0,0,0,0.2)"
      >
        <Grid is_flex>
          <Grid>
            <TitleBox>
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
              disable
              margin="10px"
              width="100px"
              _onClick={() => {
                history.push("/login")
              }}
            >
              로그인
            </Button>
            <Button
              disable
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
    </>
  )
}
const TitleBox = styled.div`
  word-break: keep-all;
`
export default Header
