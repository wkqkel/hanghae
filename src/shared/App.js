import React from "react"
import "./App.css"
import { BrowserRouter, Route } from "react-router-dom"
import { ConnectedRouter } from "connected-react-router"
import Main from "../pages/Main"
import Login from "../pages/Login"
import Signup from "../pages/Signup"
import PostWrite from "../pages/PostWrite"
import PostDetail from "../pages/PostDetail"
import Header from "../components/Header"

function App() {
  return (
    <React.Fragment>
      <Header></Header>
      <BrowserRouter>
        <Route path="/" exact component={Main} />
        <Route path="/login" exact component={Login} />
        <Route path="/signup" exact component={Signup} />
        <Route path="/write" exact component={PostWrite}></Route>
        <Route path="/write/:id" exact component={PostWrite}></Route>
        <Route path="/post/:id" exact component={PostDetail}></Route>
      </BrowserRouter>
    </React.Fragment>
  )
}

export default App
