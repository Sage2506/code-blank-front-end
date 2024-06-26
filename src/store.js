import { createStore ,compose,  applyMiddleware } from "redux";
import {thunk} from "redux-thunk";
import rootReducer from "./reducers";

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function configureStore() {
  let store = createStore(
    rootReducer,
    composeEnhancer(applyMiddleware(thunk))
  )
  return store;
}