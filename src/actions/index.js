import axios from "axios";

const url = "https://mocki.io/v1/c8c0b3f5-b3db-4c35-b230-c6a38b4a5635";

export const GET_STUDENTS = "GET_STUDENTS";
export const SET_STUDENTS = "SET_STUDENTS";
// export const GET_CLASSES = "GET_CLASSES";

export const getStudents = () => {
  return (dispatch) => {
    return axios
      .get(url)
      .then((res) => {
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

// export const getClasses = (students) => {
//   let classesList = [];
//   students.forEach((student) => {
//     // student.classes.forEach((class) => {
//     // //   if(classesList.indexOf(class) < 0) {
//     // //     classesList.push(class)
//     // //   }
//     // })
//     // console.log(student);
//     if (student.classes) {
//       for (let i = 0; i < student.classes.length; i++) {
//         if (classesList.indexOf(student.classes[i]) < 0) {
//           classesList.push(student.classes[i]);
//         }
//       }
//     }
//   });
//   console.log(classesList);
//   return { type: "GET_CLASSES", classesList };
// };
