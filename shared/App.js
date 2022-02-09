import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
import { history } from "../redux/configureStore";
import React from "react";

import PostList from "../pages/PostList";
import Login from "../pages/Login";
import Header from "../components/Header";
import Signup from "../pages/Signup";
import Postwrite from "../pages/Postwrite";
import PostDetail from "../pages/PostDetail";
import Search from "./Search";
import Notification from "../pages/Notifications";

import { Grid, Button } from "../elements";
import { useDispatch } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";
import { actionCreators as postActions } from "../redux/modules/post";
import { apiKey } from "./firebase";
import Permit from "./Permit";

function App() {
  const dispatch = useDispatch();

  const _session_key = `firebase:authUser:${apiKey}:[DEFAULT]`;
  const is_session = sessionStorage.getItem(_session_key) ? true : false;
  React.useEffect(() => {
    if (is_session) {
      dispatch(userActions.loginCheckFB());
    }
  }, []);

  return (
    <React.Fragment>
      <Grid>
        <Header></Header>
        <ConnectedRouter history={history}>
          <Route path="/" exact component={PostList} />
          <Route path="/login" exact component={Login}></Route>
          <Route path="/signup" exact component={Signup}></Route>
          <Route path="/write" exact component={Postwrite}></Route>
          <Route path="/write/:id" exact component={Postwrite}></Route>
          <Route path="/post/:id" exact component={PostDetail}></Route>
          <Route path="/search" exact component={Search}></Route>
          <Route path="/noti" exact component={Notification}></Route>
        </ConnectedRouter>
      </Grid>
      <Permit>
        <Button
          is_float
          text="+"
          _onClick={() => {
            history.push("/write");
          }}
        ></Button>
      </Permit>
    </React.Fragment>
  );
}

export default App;
