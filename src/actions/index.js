import axios from "axios";

const url = "https://6181949532c9e2001780488b.mockapi.io/students";

export const GET_STUDENTS = "GET_STUDENTS";
export const SET_STUDENTS = "SET_STUDENTS";

export const getStudents = () => {
  return (dispatch) => {
    return axios
      .get(url)
      .then((res) => {
        console.log(res);
        return res.data;
      })
      .then((data) => {
        dispatch(setStudents(data));
      });
  };
};

export const setStudents = (students) => ({
  type: "SET_STUDENTS",
  students,
});
