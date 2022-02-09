import React from "react";
import styled from "styled-components";
const Layout = (props) => {
  const { layout, children, width, margin, _onClick } = props;

  const styles = {
    width,
    layout,
    margin,
    _onClick,
  };

  return (
    <LayoutBox onClick={_onClick} {...styles}>
      {children}
    </LayoutBox>
  );
};

const LayoutBox = styled.div`
  ${(props) =>
    props.layout === "textLeft"
      ? "display:flex;"
      : props.layout === "textRight"
      ? "display:flex; flex-direction: row-reverse;"
      : ""}
  ${(props) => (props.width ? `width:${props.width}px;` : "")}
  ${(props) =>
    props.margin ? `margin:${props.margin};` : "margin-bottom:35px"}
`;

LayoutBox.defaultProps = {
  layout: false,
  children: null,
  width: "100%",
  margin: false,
  onClick: () => {},
};
export default Layout;
