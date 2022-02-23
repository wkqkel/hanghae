import React, { useEffect } from "react";
import { Button, Grid, Input, Text } from "../elements";
import styled, { keyframes, css } from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowTrendUp } from "@fortawesome/free-solid-svg-icons";
import { faClock } from "@fortawesome/free-solid-svg-icons";

import { BsFillSunFill, BsSearch, BsThreeDotsVertical } from "react-icons/bs";
import { IoMdArrowDropdown } from "react-icons/io";
import ProfileImg from "./ProfileImg";
import { history } from "../redux/configureStore";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";
import { actionCreators as postActions } from "../redux/modules/post";
const Header = (props) => {
  const dispatch = useDispatch();

  const isLogin = localStorage.getItem("userId");

  const params = useSelector((state) => state.common.params);
  // 헤더 부분 로그아웃 드롭다운 모달 구현
  const [isDropdown, setIsDropdown] = React.useState();
  const $dropdown = React.useRef();
  const [clickTrend, setClickTrend] = React.useState(true);
  // 트렌딩 모달 구현
  const [isDropTrending, setDropTrending] = React.useState();
  const [clickedCategory, changeClicked] = React.useState(1);
  const categoryList = [
    ["오늘", "day"],
    ["이번 주", "week"],
    ["이번 달", "month"],
    ["올해", "year"],
  ];
  //_ 빈화면 클릭시 사라짐
  const handleClose = (e) => {
    if (isDropdown || isDropTrending) {
      setIsDropdown(false);
      setDropTrending(false);
    }
  };
  useEffect(() => {
    window.addEventListener("click", handleClose);
    return () => {
      window.removeEventListener("click", handleClose);
    };
  });
  return (
    <>
      <Container params={params}>
        <GridBox>
          <Grid margin="-2px 0 0 0">
            <Grid is_flex height="64px" justifyContent="space-between">
              <Grid
                is_flex
                _onClick={() => {
                  history.push("/");
                  setClickTrend(true);
                  dispatch(postActions.getPostDB("week"));
                  changeClicked(1);
                }}
                width="100px"
              >
                {params === "detail" && (
                  <img
                    src="https://ifh.cc/g/0gn1qj.jpg"
                    style={{ marginRight: "5px" }}
                  ></img>
                )}
                <span
                  style={{
                    fontSize: "19px",
                    letterSpacing: "3px",
                    fontWeight: "600",
                    cursor: "pointer",
                  }}
                >
                  velog
                </span>
              </Grid>
              <Grid
                is_flex
                width={isLogin ? "252px" : "165px"}
                justifyContent="space-between"
                position="relative"
              >
                <BsFillSunFill
                  style={{
                    fontSize: "22px",
                    cursor: "pointer",
                  }}
                />
                <BsSearch
                  style={{
                    fontSize: "18px",
                    color: "#495057",
                    cursor: "pointer",
                  }}
                ></BsSearch>

                {!isLogin && (
                  <LoginBtn
                    onClick={() => {
                      history.push("/login");
                    }}
                  >
                    로그인
                  </LoginBtn>
                )}
                {isLogin && (
                  <WriteBtn
                    onClick={() => {
                      history.push("/write");
                    }}
                  >
                    새 글 작성
                  </WriteBtn>
                )}
                {isLogin && (
                  <DropdownBox
                    onClick={() => {
                      setIsDropdown(!isDropdown);
                    }}
                  >
                    <ProfileImg
                      margin="0 6px 0 0"
                      size="36px"
                      src="https://media.vlpt.us/images/wkqkel/profile/d2fc8aaa-6776-4e7a-9921-d1e96e2943bc/mydesk.jpg?w=120"
                    ></ProfileImg>
                    <IoMdArrowDropdown
                      style={{ cursor: "pointer", color: "#868E96" }}
                    ></IoMdArrowDropdown>
                    {isDropdown && (
                      <DropdownMenu isDropdown={isDropdown} ref={$dropdown}>
                        <DM_EL>내 벨로그</DM_EL>
                        <DM_EL>임시 글</DM_EL>
                        <DM_EL>읽기 목록</DM_EL>
                        <DM_EL>설정</DM_EL>
                        <DM_EL
                          onClick={() => {
                            dispatch(userActions.logoutDB());
                          }}
                        >
                          로그아웃
                        </DM_EL>
                      </DropdownMenu>
                    )}
                  </DropdownBox>
                )}
              </Grid>
            </Grid>

            {params !== "detail" && (
              <Grid
                is_flex
                justifyContent="space-between"
                height="48px"
                margin="14px 0 0 0px"
              >
                <Grid is_flex position="relative">
                  <TrendBtnLine clickTrend={clickTrend}></TrendBtnLine>
                  <TrendTextBox
                    onClick={() => {
                      setClickTrend("trend");
                      dispatch(
                        postActions.getPostDB(categoryList[clickedCategory][1])
                      );
                    }}
                  >
                    <FontAwesomeIcon
                      icon={faArrowTrendUp}
                      style={{
                        fontSize: "16px",
                        marginRight: "8px",
                        cursor: "pointer",
                      }}
                      className={clickTrend ? "clicked" : "nonClicked"}
                    />
                    <Text className={clickTrend ? "clicked" : "nonClicked"}>
                      트렌딩
                    </Text>
                  </TrendTextBox>
                  <TrendTextBox
                    onClick={() => {
                      setClickTrend(false);
                      dispatch(postActions.getPostDB());
                    }}
                  >
                    <FontAwesomeIcon
                      icon={faClock}
                      style={{
                        fontSize: "18px",
                        marginRight: "8px",
                        cursor: "pointer",
                      }}
                      className={!clickTrend ? "clicked" : "nonClicked"}
                    />
                    <Text className={!clickTrend ? "clicked" : "nonClicked"}>
                      최신
                    </Text>
                  </TrendTextBox>
                  {clickTrend && (
                    <RecentBtn
                      onClick={() => {
                        setDropTrending(!isDropTrending);
                      }}
                    >
                      {categoryList[clickedCategory][0]}
                      <IoMdArrowDropdown
                        style={{
                          fontSize: "16px",
                        }}
                      ></IoMdArrowDropdown>
                      {isDropTrending && (
                        <RecentModal>
                          {categoryList.map((e, i) => (
                            <RmEl
                              key={i}
                              onClick={() => {
                                changeClicked(i);
                                dispatch(postActions.getPostDB(e[1]));
                              }}
                              style={{
                                color:
                                  i === clickedCategory ? "#12B886" : "#212529",
                              }}
                            >
                              {e[0]}
                            </RmEl>
                          ))}
                        </RecentModal>
                      )}
                    </RecentBtn>
                  )}
                </Grid>
                <BsThreeDotsVertical
                  style={{
                    fontSize: "18px",
                    color: "#868E96",
                    cursor: "pointer",
                  }}
                ></BsThreeDotsVertical>
              </Grid>
            )}
          </Grid>
        </GridBox>
      </Container>
    </>
  );
};
const Container = styled.div`
  width: 100%;
  background: ${(props) => (props.params === "detail" ? "white;" : "#f8f9fa;")};
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

const trendBarLeftMove = keyframes`
  0% {
    left: 0px;
  }
  70% {
    left: 105px;
  }
  90% {
    left: 98px;
  }
  100% {
    left: 100px;
  }
`;
const trendBarRightMove = keyframes`
  0% {
    left: 100px;
  }
  70% {
    left: -5px;
  }
  90% {
    left: 2px;
  }
  100% {
    left: 0px;
  }
`;

const TrendBtnLine = styled.div`
  width: 102px;
  height: 2px;
  background: black;
  position: absolute;
  bottom: 4px;
  ${(props) => {
    if (!props.clickTrend) {
      return css`
        animation: ${trendBarLeftMove} 0.4s forwards;
      `;
    } else if (props.clickTrend === "trend") {
      return css`
        animation: ${trendBarRightMove} 0.4s forwards;
      `;
    }
  }}
`;

const WriteBtn = styled.div`
  width: 100px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid black;
  border-radius: 30px;
  cursor: pointer;
  &:hover {
    background: black;
    color: white;
    transition: 0.2s, background ease-out;
  }
  font-size: 15px;
  font-weight: 500;
`;

const RecentBtn = styled.div`
  font-size: 13px;
  display: flex;
  align-items: center;
  background: white;
  justify-content: space-between;
  padding: 5px 6px;
  width: 87px;
  box-shadow: 0 0 2px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  color: #495057;
  // &:hover:not(& > RecentModal) {
  //   color: #868e96;
  //   background: rgba(255, 255, 255, 0.8);
  // }
  position: relative;
`;

const RecentModal = styled.div`
  width: 172px;
  height: 152px;
  background: white;
  position: absolute;
  top: 45px;
  right: 0px;
  box-shadow: 0 0px 8px rgba(0, 0, 0, 0.13);
`;
const RmEl = styled.div`
  height: 38px;
  display: flex;
  align-items: center;
  padding-left: 16px;
  border-bottom: 1px solid #f1f3f5;
  font-weight: 500;
  font-size: 13px;
  &:hover {
    background: #f8f9fa;
  }
  cursor: pointer;
`;
const DropdownBox = styled.div`
  display: flex;
  align-items: center;
  width: auto;
  &:hover > * {
    color: black;
  }
  position: relative;
`;
const DropdownMenu = styled.div`
  width: 172px;
  height: 215px;
  background: white;
  position: absolute;
  top: 50px;
  right: 0px;
  z-index: 3;
  box-shadow: 0 0px 8px rgba(0, 0, 0, 0.13);
  display: ${(props) => (props.isDropdown ? null : "none")};
`;

const DM_EL = styled.div`
  height: 43px;
  display: flex;
  align-items: center;
  padding-left: 16px;
  font-weight: 300;
  font-size: 15px;
  &:hover {
    background: #f8f9fa;
    color: #20c997;
  }
  cursor: pointer;
`;

const LoginBtn = styled.div`
  width: 75px;
  height: 30px;
  display: flex;
  align-items: center;
  background: black;
  color: white;
  justify-content: center;
  border: 1px solid black;
  border-radius: 30px;
  cursor: pointer;
  &:hover {
    background: #212529;
    transition: 0.2s, background ease-out;
  }
  font-size: 15px;
  font-weight: 400;
`;

const TrendTextBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 42px;
  cursor: pointer;
  .clicked {
    color: black;
    font-size: 17px;
    font-weight: 600;
  }
  .nonClicked {
    color: #868e96;
    font-size: 17px;
    font-weight: 300;
  }
`;
export default Header;
