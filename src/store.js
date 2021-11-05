import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import studentsReducer from "./reducers/studentsReducer";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  combineReducers({
    students: studentsReducer,
  }),
  composeEnhancers(applyMiddleware(thunk))
);

export default store;
