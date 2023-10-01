import React from "react";
import styled from "styled-components";

const Grid = (props) => {
  const {
    is_flex,
    width,
    padding,
    margin,
    bg,
    children,
    center,
    _onClick,
    left,
  } = props;

  const styles = {
    is_flex: is_flex,
    width: width,
    margin: margin,
    padding: padding,
    bg,
    center,
    left,
  };
  return (
    <>
      <GridBox {...styles} onClick={_onClick}>
        {children}
      </GridBox>
    </>
  );
};

Grid.defaultProps = {
  width: "100%",
  bg: false,
  is_flex: false,
  margin: false,
  center: false,
  _onClick: () => {},
};

const GridBox = styled.div`
  children: null;
  width: ${(props) => props.width};
  height: 100%;
  box-sizing: border-box;
  ${(props) => (props.padding ? `padding:${props.padding};` : "")}
  ${(props) => (props.margin ? `margin:${props.margin};` : "")}
  ${(props) => (props.bg ? `background-color:${props.bg};` : "")}
  ${(props) =>
    props.is_flex
      ? `display:flex; align-items:center; justify-content: space-between`
      : ""};
  ${(props) => (props.center ? `text-align:center;` : "")}
  ${(props) => (props.left ? `justify-content:start;` : "")}
  @media only screen and (max-width: 768px) {
    padding: 5px;
  } ;
`;
export default Grid;
