import "./App.css";
import Main from "./Main";
import Header from "./Header";
import React, { useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import "./App.css";
import Write from "./Write";
import { Route } from "react-router-dom/cjs/react-router-dom.min";
import { loadWordnoteFB } from "./redux/modules/Wordnote";

function App() {
  const dispatch = useDispatch();

  // 목록 불러오는 함수 호출
  useEffect(() => {
    dispatch(loadWordnoteFB());
  }, [dispatch]);

  return (
    <div className="App">
      <Header />
      <Route path="/" exact>
        <Main></Main>
      </Route>
      <Route path="/write" exact>
        <Write></Write>
      </Route>
      <Route path="/write/:index">
        <Write></Write>
      </Route>
    </div>
  );
}

export default App;
