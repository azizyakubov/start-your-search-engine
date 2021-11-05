import "./App.css";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { getStudents } from "./actions";
import { connect } from "react-redux";
import StudentsResults from "./components/StudentsResults";

const SearchBarContainer = styled.div`
  width: 500px;
  height: 60px;
  text-align: center;
  margin: auto;
  margin-top: -30px;
  margin-bottom: 30px;
`;

const SearchBar = styled.input`
  width: 100%;
  height: 100%;
  border-radius: 25px;
  padding: 0px 15px;
`;

const App = (props) => {
  const [students, setStudents] = useState(props.students);
  const [loading, setLoading] = useState(false);
  const searchRef = useRef();

  useEffect(() => {
    // setStudents([]);
    setLoading(true);
    props.dispatch(getStudents());
    searchRef.current = onSearchText;
  }, []);

  useEffect(() => {
    if (props.students.length > 0) {
      setStudents(props.students);
      setLoading(false);
    }
  }, [props.students]);

  const onSearchText = (text, props) => {
    let filteredResults;
    if (text) {
      filteredResults = props.students.filter((student) =>
        student.firstName.toLowerCase().includes(text.toLowerCase())
      );
    } else {
      filteredResults = props.students;
    }
    setStudents(filteredResults);
  };

  const handleSearch = (event) => {
    searchRef.current(event.target.value, props);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Student Finder</h1>
      </header>
      <SearchBarContainer>
        <SearchBar
          placeholder="Search for students..."
          onChange={handleSearch}
          ref={searchRef}
        ></SearchBar>
      </SearchBarContainer>
      <StudentsResults students={students} loading={loading}></StudentsResults>
    </div>
  );
};

const mapStateToProps = (state) => ({
  students: state.students,
});
export default connect(mapStateToProps)(App);
