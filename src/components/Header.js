import React from "react";
import { Grid, Text } from "../elements";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowTrendUp } from "@fortawesome/free-solid-svg-icons";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import { faSun } from "@fortawesome/free-solid-svg-icons";
import { BsFillSunFill, BsSearch, BsThreeDotsVertical } from "react-icons/bs";
import { IoMdArrowDropdown } from "react-icons/io";
import ProfileImg from "./ProfileImg";
import { history } from "../redux/configureStore";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";

const Header = (props) => {
  const dispatch = useDispatch();
  const local_token = localStorage.getItem("token") ? true : false;
  const is_login = useSelector((state) => state.user.is_login);
  React.useEffect(() => {}, [is_login]);

  return (
    <>
      <Container>
        <GridBox>
          <Grid>
            <Grid is_flex height="64px" justifyContent="space-between">
              <span
                style={{
                  fontSize: "19px",
                  letterSpacing: "3px",
                  fontWeight: "600",
                  cursor: "pointer",
                }}
                onClick={() => {
                  history.push("/");
                }}
              >
                Velog
              </span>
              <Grid
                is_flex
                justifyContent="end"
                width="252px"
                justifyContent="space-between"
              >
                <BsFillSunFill
                  style={{
                    fontSize: "22px",
                    cursor: "pointer",
                  }}
                />
                <BsSearch
                  onClick={() => {
                    dispatch(userActions.logoutDB());
                  }}
                  style={{
                    fontSize: "18px",
                    color: "#495057",
                    cursor: "pointer",
                  }}
                ></BsSearch>

                <WriteBtn
                  onClick={() => {
                    history.push("/write");
                  }}
                >
                  새 글 작성
                </WriteBtn>
                <Grid is_flex width="auto">
                  <ProfileImg
                    margin="0 6px 0 0"
                    size="36px"
                    src="https://media.vlpt.us/images/wkqkel/profile/d2fc8aaa-6776-4e7a-9921-d1e96e2943bc/mydesk.jpg?w=120"
                  ></ProfileImg>
                  <IoMdArrowDropdown
                    style={{ cursor: "pointer", color: "#868E96" }}
                  ></IoMdArrowDropdown>
                </Grid>
              </Grid>
            </Grid>

            <Grid
              is_flex
              justifyContent="space-between"
              height="48px"
              margin="14px 0 0 0px"
            >
              <Grid is_flex position="relative">
                <TrendBtnLine></TrendBtnLine>
                <Grid
                  is_flex
                  width="100px"
                  justifyContent="center"
                  height="42px"
                >
                  <FontAwesomeIcon
                    icon={faArrowTrendUp}
                    style={{
                      fontSize: "16px",
                      marginRight: "8px",
                      cursor: "pointer",
                    }}
                  />
                  <Text size="17px" bold weight="300">
                    트렌딩
                  </Text>
                </Grid>
                <Grid width="100px" is_flex justifyContent="center">
                  <FontAwesomeIcon
                    icon={faClock}
                    style={{
                      fontSize: "18px",
                      marginRight: "8px",
                      color: "#868E96",
                      cursor: "pointer",
                    }}
                  />
                  <Text size="18px" color="#868E96" weight="300">
                    최신
                  </Text>
                </Grid>
                <RecentBtn>
                  이번 주
                  <IoMdArrowDropdown
                    style={{
                      marginLeft: "10px",
                      fontSize: "16px",
                      color: "#495057",
                    }}
                  ></IoMdArrowDropdown>
                </RecentBtn>
              </Grid>
              <BsThreeDotsVertical
                style={{
                  fontSize: "18px",
                  color: "#868E96",
                  cursor: "pointer",
                }}
              ></BsThreeDotsVertical>
            </Grid>
          </Grid>
        </GridBox>
      </Container>
    </>
  );
};
const Container = styled.div`
  width: 100%;
  background: #f8f9fa;
  display: flex;
  align-items: center;
  @media screen and (max-width: 1440px) {
    padding: 30px;
  }
  @media screen and (max-width: 1056px) {
    padding: 20px;
  }
`;
const GridBox = styled.div`
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1570px;
  @media screen and (max-width: 1720px) {
    grid-template-columns: 1240px;
  }
  @media screen and (max-width: 1440px) {
    grid-template-columns: 920px;
  }
  @media screen and (max-width: 1056px) {
    width: 100%;
    grid-template-columns: 2fr;
  }
  @media screen and (max-width: 767px) {
    width: 100%;
    grid-template-columns: 1fr;
  }
`;
const TrendBtnLine = styled.div`
  width: 102px;
  height: 2px;
  background: black;
  position: absolute;
  bottom: 4px;
`;

const WriteBtn = styled.div`
  width: 100px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid black;
  border-radius: 30px;
  font-size: 14px;
  font-weight: 400;
  cursor: pointer;
  &:hover {
    background: black;
    color: white;
    transition: 0.2s, background ease-out;
  }
`;

const RecentBtn = styled.div`
  font-size: 14px;
  display: flex;
  align-items: center;
  background: white;
  padding: 4px 10px;
  box-shadow: 0 0 2px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  color: #495057;
`;
export default Header;
