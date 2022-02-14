import { createAction, handleActions } from "redux-actions"
import { produce } from "immer"
import { setCookie, deleteCookie } from "../../shared/Cookie"
import { TokenToCookie } from "../../shared/Cookie"
import instance from "../../shared/Request"
import { history } from "../configureStore"

//actions
const LOG_IN = "LOG_IN"
const LOG_OUT = "LOG_OUT"
const GET_USER = "GET_USER"
const SIGN_UP = "SIGN_UP"
const SET_USER = "SET_USER"

//action creators
const logIn = createAction(LOG_IN, (accountId, nickname, id, token) => ({
  accountId,
  nickname,
  id,
  token,
}))
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
        console.log(response.data)
        dispatch(signUp(id, nickname, pwd))
        window.alert("가입을 축하드려요!")
        history.push("/login")
      })
      .catch((err) => {
        console.log(`회원가입 오류 발생: ${err}`)
      })
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
        //is_login자리 토큰 들어가야 함
        setCookie("is_login", "success")
        // draft.user = action.payload.user
        draft.list = { ...action.payload }
        draft.is_login = true
      }),
    [LOG_OUT]: (state, action) =>
      produce(state, (draft) => {
        deleteCookie("is_login")
        draft.user = null
        draft.is_login = false
      }),
    [GET_USER]: (state, action) => produce(state, (draft) => {}),
    [SIGN_UP]: (state, action) =>
      produce(state, (draft) => {
        deleteCookie("is_login")
        console.log(action.payload)
      }),
  },
  initialState
)

//action creator export
const actionCreators = {
  logIn,
  logOut,
  signUpDB,
  getUser,
  setUser,
}

export { actionCreators }
