import "./App.css";
import { Route, Switch } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";

import { history } from "../redux/configureStore";
import Header from "../components/Header";
import Main from "../pages/Main";
// import Login from "../pages/Login";
import SingUp from "../pages/SignUp";
import Detail from "../pages/Detail";
import PostWrite from "../pages/PostWrite";

// import { actionCreators as userActions } from "../redux/modules/user";

function App() {
  return (
    <>
      <ConnectedRouter history={history}>
        <Switch>
          <Route path="/write" exact component={PostWrite}></Route>
          <Route path="/write/:postId" exact component={PostWrite}></Route>
          <Route path="/signup" component={SingUp} />
          <>
            <Header></Header>
            <Route path="/" exact component={Main} />
            <Route path="/detail/:postId" component={Detail} />
          </>
        </Switch>
      </ConnectedRouter>
    </>
  );
}

export default App;
