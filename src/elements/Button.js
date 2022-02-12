import React from "react"
import styled from "styled-components"

const Button = (props) => {
  const {
    text,
    _onClick,
    children,
    margin,
    width,
    padding,
    disable,
    bg,
    color,
    cursor,
  } = props

  const styles = {
    margin,
    width,
    padding,
    color,
    bg,
    cursor,
  }

  return (
    <>
      <ElButton {...styles} onClick={_onClick} disabled={disable}>
        {children}
      </ElButton>
    </>
  )
}

Button.defaultProps = {
  text: false,
  _onClick: () => {},
  children: null,
  margin: false,
  padding: "12px 0px",
  disable: false,
  color: "#fff",
  width: "100%",
  cursor: "pointer",
}

const ElButton = styled.button`
  box-sizing: border-box;
  border: none;
  border-radius: 5px;
  width: ${(props) => props.width};
  background-color: ${(props) => (props.disabled ? "#3CD3AD;" : "#212121;")};
  color: ${(props) => props.color};
  padding: ${(props) => props.padding};
  ${(props) => (props.margin ? `margin:${props.margin};` : "")};
  cursor: ${(props) => props.cursor};
`

export default Button
