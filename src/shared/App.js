import React from "react"
import "./App.css"
import { Route } from "react-router-dom"
import { ConnectedRouter } from "connected-react-router"
import { history } from "../redux/configureStore"

import Main from "../pages/Main"
import Login from "../pages/Login"
import Signup from "../pages/Signup"
import PostWrite from "../pages/PostWrite"
import PostDetail from "../pages/PostDetail"
import Header from "../components/Header"
import { useSelector, useDispatch } from "react-redux"
import { actionCreators as userActions } from "../redux/modules/user"

import Permit from "./Permit"
import Spinner from "./Spinner"

function App() {
  const dispatch = useDispatch()

  //spinner
  const post_is_loaded = useSelector((state) => state.post.is_loaded)
  const user_is_loaded = useSelector((state) => state.user.is_loaded)
  const comment_is_loaded = useSelector((state) => state.comments.is_loaded)

  //login check
  const is_session = localStorage.getItem("token") ? true : false
  const is_login = useSelector((state) => state.user.is_login)
  React.useEffect(() => {
    if (is_session) {
      dispatch(userActions.setUser())
    }
  }, [is_login])

  return (
    <React.Fragment>
      <Header></Header>
      <ConnectedRouter history={history}>
        <Route path="/" exact component={Main} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/write" exact component={PostWrite}></Route>
        <Route path="/write/:id" exact component={PostWrite}></Route>
        <Route path="/post/:id" exact component={PostDetail}></Route>
      </ConnectedRouter>
      <Permit></Permit>
      {!post_is_loaded && !user_is_loaded && !comment_is_loaded && <Spinner />}
    </React.Fragment>
  )
}

export default App
