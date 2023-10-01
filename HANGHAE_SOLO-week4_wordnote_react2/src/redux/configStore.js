import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import Wordnote from "./modules/Wordnote";
// 스토어 만들기
// 리듀서, 미들웨어 등을 묶어서 스토어를 만듬
const rootReducer = combineReducers({ Wordnote });
const middlewares = [thunk];
const enhancer = applyMiddleware(...middlewares);
const store = createStore(rootReducer, enhancer);

export default store;
