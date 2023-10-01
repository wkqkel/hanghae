import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import instance from "../../shared/Request";

// import axios from "axios"
const SET_USER = "SET_USER";
const LOG_OUT = "LOG_OUT";

//2. action creators (액션 생성 함수 만들기)

const setUser = createAction(SET_USER, (user) => ({ user }));
const logOut = createAction(LOG_OUT, (user) => ({ user }));

//3.기본 상태값을 임의로 지정해줘야해!
const initialState = {
  user: null,
  is_login: false,
};

//5. 미들웨어 부분 작성하기 (백엔드에 데이터 보내주는 작업)

// 로그인
const LoginDB = (userMail, passWord) => {
  //
  return function (dispatch, getState, { history }) {
    //*프론트에서 입력한 값을 넘겨주는 거
    const user = {
      userMail: userMail,
      passWord: passWord,
    };
    //*로그인 성공되면 백에서 주는 값을 가져오는거
    instance
      .post("/user/login", user)
      .then((response) => {
        localStorage.setItem("userId", response.data.userId);
        localStorage.setItem("token", response.data.token);
        dispatch(setUser(response.data.userId));
        console.log(response.data);
        window.location.replace("/");
      })
      .catch((response) => {
        window.alert("아이디 혹은 비밀번호가 틀렸습니다.");
      });
  };
};

//회원가입

const signupDB = (userMail, userId, passWord) => {
  return async function (dispatch, getState, { history }) {
    console.log(history);
    const userInfo = {
      userMail: userMail,
      userId: userId,
      passWord: passWord,
    };

    instance
      .post("/user/register", userInfo)
      .then((response) => {
        console.log("잘되고있나욤");
        window.alert(response.data.message);
        history.push("/");
      })
      .catch((response) => {
        console.log("hi");
        console.log(response.data.message);
      });
  };
};

//로그아웃
const logoutDB = () => {
  return function (dispatch, getState, { history }) {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    dispatch(logOut());
    window.location.replace("/");
  };
};

//4.reducer(리덕스에 저장하는 부분(스토어에 저장해주는!))
export default handleActions(
  {
    [SET_USER]: (state, action) =>
      produce(state, (draft) => {
        draft.user = action.payload.user;
        draft.is_login = true;
        console.log(draft.is_login);
      }),
    [LOG_OUT]: (state, action) =>
      produce(state, (draft) => {
        draft.user = null;
        draft.is_login = false;
      }),
  },
  initialState
);

const actionCreators = {
  setUser,
  logOut,
  LoginDB,
  signupDB,
  logoutDB,
};
export { actionCreators };
