import axios from "axios";

const url = "https://mocki.io/v1/c8c0b3f5-b3db-4c35-b230-c6a38b4a5635";

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
