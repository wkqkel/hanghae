import React from "react";
import styled from "styled-components";

const ProfileImg = (props) => {
  const { src, size, margin } = props;
  const styles = {
    src,
    size,
    margin,
  };
  return <Profile {...styles}></Profile>;
};

ProfileImg.defaultProps = {
  size: "24px",
  src: "https://media.vlpt.us/images/heyiminhye/profile/3f109555-5397-4ac9-bc9b-a42d21b80f5b/95872241.png?w=120",
};
const Profile = styled.div`
  width: ${(props) => props.size};
  min-height: ${(props) => props.size};
  border-radius: 50%;
  background-image: url("${(props) => props.src}");
  background-size: cover;
  background-position: center center;
  margin: ${(props) => props.margin};
  cursor: pointer;
`;

export default ProfileImg;
