import React from "react";

import styled from "styled-components";

const Button = (props) => {
  const {
    text,
    _onClick,
    is_float,
    children,
    margin,
    width,
    padding,
    disable,
    bg,
  } = props;
  const styles = {
    margin,
    width,
    padding,
  };

  if (is_float) {
    return (
      <>
        <FloatButton {...styles} onClick={_onClick}>
          {text ? text : children}
        </FloatButton>
      </>
    );
  }

  return (
    <>
      <ElButton {...styles} onClick={_onClick} disabled={disable}>
        {text ? text : children}
      </ElButton>
    </>
  );
};

Button.defaultProps = {
  text: false,
  _onClick: () => {},
  is_float: false,
  children: null,
  margin: false,
  width: "100%",
  padding: "12px 0px",
  disable: false,
};
const ElButton = styled.button`
  width: ${(props) => props.width};
  background-color: ${(props) => (props.disabled ? "#808080;" : "#212121;")} 
  color: #ffffff;
  padding: ${(props) => props.padding};
  box-sizing: border-box;
  border: none;
  ${(props) => (props.margin ? `margin:${props.margin};` : "")};
  
`;
const FloatButton = styled.button`
  width: 50px;
  height: 50px;
  background-color: #212121;
  color: #fff;
  box-sizing: border-box;
  font-size: 36px;
  font-weight: 800;
  position: fixed;
  bottom: 50px;
  right: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50px;
  ${(props) => (props.margin ? `margin:${props.margin};` : "")};
`;
export default Button;
