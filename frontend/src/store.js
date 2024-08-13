import { legacy_createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

import { thunk } from "redux-thunk";

const initialState = {};

import {
  authReducer,
  EmployeReducer,
  gettAllEmploye,
} from "./assets/AllReducer";
const reducer = combineReducers({
  auth: authReducer,
  emp: EmployeReducer,
  allEmp: gettAllEmploye,
});

const middleware = [thunk];

// const store = legacy_createStore(
//   combineReducers,
//   initialState,
//   composeWithDevTools(applyMiddleware(...middleware))
// );

const store = legacy_createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
