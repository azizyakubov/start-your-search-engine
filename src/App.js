import "./App.css";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import BootstrapSwitchButton from "bootstrap-switch-button-react";
import _ from "lodash";
import { getStudents } from "./actions";
import { connect } from "react-redux";
import StudentsResults from "./components/StudentsResults";
import ClassesFilter from "./components/ClassFilter";

const SearchBarContainer = styled.div`
  width: 500px;
  height: 50px;
  text-align: center;
  margin: auto;
  margin-top: -30px;
  margin-bottom: 30px;
`;

const SearchBar = styled.input`
  width: 100%;
  height: 100%;
  border-radius: 15px;
  padding: 0px 15px;
`;

const ToggleContainer = styled.div`
  position: relative;
  right: -350px;
  top: -50px;
`;
const App = (props) => {
  const [students, setStudents] = useState(props.students);
  const [loading, setLoading] = useState(false);
  const [searchToggle, setSearchToggle] = useState(true);
  const [classOptions, setClassOptions] = useState([]);
  let searchRef = useRef();

  useEffect(() => {
    setLoading(true);
    props.dispatch(getStudents());
    searchRef.current = onSearchText;
  }, []);

  useEffect(() => {
    if (props.students.length > 0) {
      setStudents(props.students);
      compileClasses(props.students);
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
    searchRef.current = onSearchText;
    searchRef.current(event.target.value, props);
  };

  const handleSearchToggle = () => {
    // toggles between search by name or search by selections of classes
    setSearchToggle(!searchToggle);
    setStudents(props.students);
  };

  const compileClasses = (students) => {
    let classesList = [];
    students.forEach((student) => {
      student.classes.forEach((cl) => {
        if (classesList.indexOf(cl) < 0) {
          classesList.push(cl);
        }
      });
    });
    let options = classesList.map((cl) => {
      return {
        value: cl,
        label: cl.toUpperCase(),
      };
    });
    setClassOptions(options);
  };

  const handleFilter = (selected) => {
    let studentResults;
    let classesList = [];
    if (selected.length) {
      selected.map((cl) => classesList.push(cl.value));
      studentResults = props.students.filter(
        (student) =>
          // check if subset (selected classesList) is container in the superset (individual student's classes)
          _.difference(classesList.sort(), student.classes.sort()).length === 0
      );
    } else {
      studentResults = props.students;
    }
    setStudents(studentResults);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Student Finder</h1>
      </header>
      <SearchBarContainer>
        {searchToggle ? (
          <SearchBar
            placeholder="Search for students..."
            onChange={handleSearch}
            ref={(el) => {
              searchRef = el;
            }}
          ></SearchBar>
        ) : (
          <ClassesFilter handleFilter={handleFilter} options={classOptions} />
        )}
        <ToggleContainer>
          <BootstrapSwitchButton
            width={175}
            height={50}
            checked={searchToggle}
            onlabel="Searching by name"
            offlabel="Searching by class"
            onstyle="success"
            onChange={handleSearchToggle}
          />
        </ToggleContainer>
      </SearchBarContainer>

      <StudentsResults students={students} loading={loading}></StudentsResults>
    </div>
  );
};

const mapStateToProps = (state) => ({
  students: state.students,
});
export default connect(mapStateToProps)(App);
