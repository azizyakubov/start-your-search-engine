import { combineReducers } from "redux";
import studentsReducer from "./studentsReducer";

const rootReducer = combineReducers({
  students: studentsReducer,
});

export default rootReducer;
