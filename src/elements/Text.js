import React, { Children } from "react"
import styled from "styled-components"

const Text = (props) => {
  const { bold, color, size, children, margin, padding, weight } = props

  const styles = {
    color,
    size,
    bold,
    margin,
    padding,
    weight,
  }
  return (
    <>
      <P {...styles}>{children}</P>
    </>
  )
}

Text.defaultProps = {
  children: null,
  bold: false,
  color: "#000",
  size: "14px",
  margin: false,
  padding: false,
  weight: false,
}

const P = styled.p`
  color: ${(props) => props.color};
  font-size: ${(props) => props.size};
  font-weight: ${(props) =>
    props.bold ? "600" : props.weight ? props.weight : "400"};
  ${(props) => (props.margin ? `margin: ${props.margin};` : "")}
  ${(props) => (props.padding ? `padding: ${props.padding};` : "")}
`

export default Text
