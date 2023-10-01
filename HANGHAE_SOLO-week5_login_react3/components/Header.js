import React from "react";
import { useEffect } from "react";
import { Grid, Text, Button } from "../elements";
import { getCookie, deleteCookie } from "../shared/Cookie";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators as Actions } from "../redux/modules/user";
import { history } from "../redux/configureStore";
import { apiKey } from "../shared/firebase";

const Header = (props) => {
  const is_login = useSelector((state) => state.user.is_login);
  const dispatch = useDispatch();
  const _session_key = `firebase:authUser:${apiKey}:[DEFAULT]`;
  const is_session = sessionStorage.getItem(_session_key) ? true : false;
  if (is_login && is_session) {
    return (
      <>
        <Grid is_flex padding="16px 30%">
          <Grid>
            <Text
              margin="0px"
              size="24px"
              bold
              _onClick={() => {
                history.push("/");
              }}
            >
              헬로
            </Text>
          </Grid>
          <Grid is_flex>
            <Button text="내정보"></Button>
            <Button text="알림" _onClick={() => history.push("/noti")}></Button>
            <Button
              text="로그아웃"
              _onClick={() => {
                dispatch(Actions.logOutFB());
              }}
            ></Button>
          </Grid>
        </Grid>
      </>
    );
  }

  return (
    <>
      <Grid is_flex padding="16px 30%">
        <Grid>
          <Text
            margin="0px"
            size="24px"
            bold
            _onClick={() => {
              history.push("/");
            }}
          >
            헬로
          </Text>
        </Grid>
        <Grid is_flex>
          <Button
            text="로그인"
            _onClick={() => {
              history.push("/login");
            }}
          ></Button>
          <Button
            text="회원가입"
            _onClick={() => {
              history.push("/signup");
            }}
          ></Button>
        </Grid>
      </Grid>
    </>
  );
};

Header.defaultProps = {};

export default Header;
