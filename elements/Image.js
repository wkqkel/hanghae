import styled from "styled-components";
import React from "react";

const Image = (props) => {
  const { shape, src, size } = props;
  const styles = {
    src: src,
    size: size,
  };
  if (shape === "circle") {
    return <ImageCircle {...styles}></ImageCircle>;
  }
  if (shape === "rectangle") {
    return (
      <AspectOutter {...styles}>
        <AspectInner {...styles}></AspectInner>
      </AspectOutter>
    );
  }
  return (
    <React.Fragment>
      <ImageDefault {...styles} />
    </React.Fragment>
  );
};

Image.defaultProps = {
  shape: "rectangle",
  src: "https://dthezntil550i.cloudfront.net/u6/latest/u61809171857088090006682359/1280_960/c32f5e7d-25be-4d2c-a17b-498ff5d255cb.png",
  size: 36,
};

const ImageDefault = styled.div`
  --size: ${(props) => props.size}px;
  width: var(--size);
  height: var(--size);
  background-image: url("${(props) => props.src}");
  background-size: cover;
`;

const AspectOutter = styled.div`
  ${(props) => {
    return props.size !== 36 ? `width:${props.size}px;` : `width:100%;`;
  }}
  min-width: 250px;
`;

const AspectInner = styled.div`
  position: relative;
  padding-top: 75%;
  overflow: hidden;
  background-image: url("${(props) => props.src}");
  background-size: cover;
`;
const ImageCircle = styled.div`
  --size: ${(props) => props.size}px;
  width: var(--size);
  height: var(--size);
  border-radius: var(--size);
  background-image: url("${(props) => props.src}");
  background-size: cover;
  margin: 4px;
`;
export default Image;
