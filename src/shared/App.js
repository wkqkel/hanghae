import "./App.css";
import { Route, Switch } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
import { useSelector, useDispatch } from "react-redux";
import { history } from "../redux/configureStore";

import Header from "../components/Header";
import Main from "../pages/Main";
import PostWrite from "../pages/PostWrite";

// import { actionCreators as userActions } from "../redux/modules/user";

import { Button, Grid, Input, Text } from "../elements";

function App() {
  const dispatch = useDispatch();
  return (
    <>
      <ConnectedRouter history={history}>
        <Switch>
          <Route path="/write" exact component={PostWrite}></Route>
          <>
            <Header></Header>
            <Route path="/" exact component={Main} />
          </>

          {/* <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />

          <Route path="/write/:id" exact component={PostWrite}></Route>
          <Route path="/post/:id" exact component={PostDetail}></Route> */}
        </Switch>
      </ConnectedRouter>
    </>
  );
}

export default App;
