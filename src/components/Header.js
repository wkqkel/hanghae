import React from "react"
import { Button, Text, Grid, Input } from "../elements"

const Header = (props) => {
  return (
    <>
      <Grid
        padding="8px 20px"
        width="100vw"
        is_flex
        borderBottom="1px solid rgba(0,0,0,0.2)"
      >
        <Grid>
          <Text color="#000" bold size="26px" padding="0px 15%">
            모<span style={{ fontSize: "24px" }}>임</span>
            <span style={{ fontSize: "23px" }}>
              의<br></br>
            </span>
            민<span style={{ fontSize: "24px" }}>족</span>
          </Text>
        </Grid>
      </Grid>
    </>
  )
}

export default Header
