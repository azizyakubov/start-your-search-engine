import { GET_CLASSES, GET_STUDENTS, SET_STUDENTS } from "../actions";

const studentsReducer = (state = [], action) => {
  switch (action.type) {
    case GET_STUDENTS:
      return [...action.payload];
    case SET_STUDENTS:
      return [...state, ...action.students];
    // case GET_CLASSES:
    //   return [...state, ...action.classesList];
    default:
      return state;
  }
};
export default studentsReducer;
