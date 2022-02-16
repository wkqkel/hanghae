import { createAction, handleActions } from "redux-actions"
import { produce } from "immer"
import { setCookie, deleteCookie } from "../../shared/Cookie"
import instance from "../../shared/Request"
import { history } from "../configureStore"

//actions
const LOG_OUT = "LOG_OUT"
const GET_USER = "GET_USER"
const SIGN_UP = "SIGN_UP"
const SET_USER = "SET_USER"
const ID_CHECK = "ID_CHECK"
const NICKNAME_CHECK = "NICKNAME_CHECK"

//action creators
const signUp = createAction(SIGN_UP, (id, email, nickname, password) => ({
  nickname,
  id,
  email,
  password,
}))
const getUser = createAction(GET_USER, (user) => ({ user }))
const logOut = createAction(LOG_OUT, (user) => ({ user }))
const setUser = createAction(SET_USER, (user) => ({ user }))
const idCheck = createAction(ID_CHECK, (result) => ({ result }))
const nicknameCheck = createAction(NICKNAME_CHECK, (result) => ({ result }))

//initialState
const initialState = {
  user: {
    userEmail: "",
    userId: 1,
    userName: "",
  },
  is_login: false,
  idCheck: false,
  nicknameCheck: false,
}

//middleware actions
const signUpDB = (id, nickname, pwd, pwdcheck) => {
  return function (dispatch) {
    instance
      .post(`/user/signup`, {
        userId: id,
        userName: nickname,
        password: pwd,
        passwordConfirm: pwdcheck,
      })
      .then((response) => {
        dispatch(signUp(id, nickname, pwd))
        window.alert("가입을 축하드려요!")
        history.push("/login")
      })
      .catch((error) => {
        const err_message = error.response.data.errorMessage
        window.alert(err_message)
      })
  }
}

const logInDB = (username, password) => {
  return function (dispatch, getState, { history }) {
    instance
      .post("/user/login", {
        userId: username,
        password: password,
      })
      .then((response) => {
        const accessToken = response.data.token
        setCookie("token", accessToken)
        localStorage.setItem("loginUserId", response.data.userId)
        localStorage.setItem("loginUserName", response.data.userName)
        dispatch(setUser({ userId: username, password: password }))
        localStorage.setItem("token", accessToken)
        history.push("/")
        // window.location.href = "/"
      })
      .catch((error) => {
        const err_message = error.response.data.errorMessage
        window.alert(err_message)
      })
  }
}

const idCheckDB = (userId) => {
  return function (dispatch, getState, { history }) {
    instance
      .post("/user/check/email", { userId: userId })
      .then((response) => {
        dispatch(idCheck({ response }))
        window.alert("사용 가능한 아이디 입니다.")
      })
      .catch((error) => {
        const error_message = error.response.data.result
        console.log("error", error.response)
        if (error_message === "false") {
          window.alert("사용 중인 아이디 입니다!")
          localStorage.setItem("checkId", "false")
        }
      })
  }
}

const nicknameCheckDB = (nickname) => {
  return function (dispatch, getState, { history }) {
    instance
      .post("/user/check/nickname", { userName: nickname })
      .then((response) => {
        dispatch(nicknameCheck(response))
        window.alert("사용 가능한 닉네임 입니다.")
      })
      .catch((error) => {
        const error_message = error.response.data.result
        console.log("error", error.response)
        if (error_message === "false") {
          window.alert("사용 중인 닉네임 입니다!")
        }
      })
  }
}
export default handleActions(
  {
    [SET_USER]: (state, action) =>
      produce(state, (draft) => {
        draft.is_login = true
      }),
    [LOG_OUT]: (state, action) =>
      produce(state, (draft) => {
        deleteCookie("is_login")
        localStorage.removeItem("loginUserId")
        localStorage.removeItem("loginUserName")
        localStorage.removeItem("token")
        draft.user = null
        draft.is_login = false
        draft.idCheck = false
        draft.nicknameCheck = false
      }),
    [GET_USER]: (state, action) => produce(state, (draft) => {}),
    [SIGN_UP]: (state, action) =>
      produce(state, (draft) => {
        deleteCookie("is_login")
      }),
    [ID_CHECK]: (state, action) =>
      produce(state, (draft) => {
        draft.idCheck = true
      }),
    [NICKNAME_CHECK]: (state, action) =>
      produce(state, (draft) => {
        draft.nicknameCheck = true
      }),
  },
  initialState
)

//action creator export
const actionCreators = {
  logInDB,
  signUpDB,
  logOut,
  getUser,
  setUser,
  idCheckDB,
  nicknameCheckDB,
  idCheck,
}

export { actionCreators }
