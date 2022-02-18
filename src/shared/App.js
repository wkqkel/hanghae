import "./App.css";
import { Route } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
import { useSelector, useDispatch } from "react-redux";
import { history } from "../redux/configureStore";

import Main from "../pages/Main";

// import { actionCreators as userActions } from "../redux/modules/user";

import { Button, Grid, Input, Text } from "../elements";

function App() {
  const dispatch = useDispatch();
  return (
    <>
      {/* <Header></Header> */}
      <ConnectedRouter history={history}>
        <Route path="/" exact component={Main} />
        {/* <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/write" exact component={PostWrite}></Route>
        <Route path="/write/:id" exact component={PostWrite}></Route>
        <Route path="/post/:id" exact component={PostDetail}></Route> */}
      </ConnectedRouter>
    </>
  );
}

export default App;
