import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { createBrowserHistory } from "history";
import { connectRouter } from "connected-react-router";

import user from "./modules/user";

import Post from "./modules/post";
import Common from "./modules/common";
import Like from "./modules/like";
import Comment from "./modules/comment";

// import Post from "./modules/post" // 리듀서 연결위해 모듈스파일 임포트

export const history = createBrowserHistory();

//history와 router가 연결되었다!
const rootReducer = combineReducers({
  // post: Post, // 임포트해준 모듈스 파일 루트리듀서에 합쳐줌
  user: user,
  post: Post,
  common: Common,
  like: Like,
  comment: Comment,
  router: connectRouter(history),
});

// const middlewares = [thunk];
const middlewares = [thunk.withExtraArgument({ history: history })];

// 지금이 어느 환경인 지 알려줘요. (개발환경, 프로덕션(배포)환경 ...)
const env = process.env.NODE_ENV;

// 개발환경에서는 로거라는 걸 하나만 더 써볼게요.
// env 가 development(개발환경 일 때)
if (env === "development") {
  //logger 라는 것을 가지고 온다  require (패키지를 가지고 온다.)
  const { logger } = require("redux-logger");
  middlewares.push(logger);
}

const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
      })
    : compose;

const enhancer = composeEnhancers(applyMiddleware(...middlewares));

let store = (initialStore) => createStore(rootReducer, enhancer);

export default store();
