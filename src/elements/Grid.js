import React from "react"
import styled from "styled-components"

const Grid = (props) => {
  const {
    is_flex,
    width,
    padding,
    margin,
    bg,
    children,
    _onClick,
    height,
    left,
    borderBottom,
    is_flex_start,
  } = props

  const styles = { is_flex, width, height, padding, margin, bg, borderBottom }

  return (
    <>
      <GridBox {...styles} onClick={_onClick}>
        {children}
      </GridBox>
    </>
  )
}

Grid.defaultProps = {
  chidren: null,
  is_flex: false,
  width: "100%",
  height: "100%",
  padding: false,
  margin: false,
  bg: false,
  borderBottom: false,
}
const GridBox = styled.div`
  box-sizing: border-box;
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  ${(props) => (props.padding ? `padding: ${props.padding};` : "")}
  ${(props) => (props.margin ? `margin: ${props.margin};` : "")}
  ${(props) => (props.bg ? `background-color: ${props.bg};` : "")}
  ${(props) =>
    props.is_flex
      ? `display: flex; align-items: center; justify-content: space-between; `
      : ""}
  ${(props) =>
    props.borderBottom ? `border-bottom: ${props.borderBottom};` : ""}
`
export default Grid
