import React from "react"
import styled from "styled-components"
import { Text } from "."

const Input = (props) => {
  const {
    _onChange,
    placeholder,
    type,
    value,
    is_submit,
    onSubmit,
    is_radio,
    name,
    checked,
    multiline,
    label,
    width,
  } = props

  const styles = {
    width,
  }
  return (
    <>
      {label && <Text margin="0px">{label}</Text>}
      <ElInput
        {...styles}
        type={type}
        onChange={_onChange}
        placeholder={placeholder}
        value={value}
        onKeyPress={(e) => {
          if (e.key === "Enter") {
            onSubmit()
          }
        }}
      />
    </>
  )
}

Input.defaultProps = {
  multiLine: false,
  label: false,
  placeholder: "텍스트를 입력해주세요.",
  type: "text",
  width: "100%",
  _onChange: () => {},
  _onClick: () => {},
}
const ElInput = styled.input`
  border: 1px solid #212121;
  width: ${(props) => props.width};
  padding: 12px 4px;
  box-sizing: border-box;
  border: 2px solid #3cd3ad;
  border-radius: 5px;
`
export default Input
