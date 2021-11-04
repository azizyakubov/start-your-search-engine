import { GET_STUDENTS } from "../actions";

export default function studentsReducer(state = [], action) {
  switch (action.type) {
    case GET_STUDENTS:
      return [...action.payload];
    default:
      return state;
  }
}
