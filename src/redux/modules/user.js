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

//initialState
const initialState = {
  user: {
    userEmail: "",
    userId: 1,
    userName: "",
  },
  is_login: false,
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
      .catch((err) => {})
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
      })
      .catch((error) => {})
  }
}

// const loginCheckFB = () => {
//   return function (dispatch, getState, {history}) {
//     const TOKEN = localStorage.getItem("token");
//     if(TOKEN) {
//       instance.get(``)
//     }
//   }
// }
//reducer
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
      }),
    [GET_USER]: (state, action) => produce(state, (draft) => {}),
    [SIGN_UP]: (state, action) =>
      produce(state, (draft) => {
        deleteCookie("is_login")
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
}

export { actionCreators }
