import "./App.css";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { getStudents } from "./actions";
import { connect } from "react-redux";
import StudentsResults from "./components/StudentsResults";
import ClassesFilter from "./components/ClassFilter";

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

const ToggleLabel = styled.span`
  color: blue;
  position: relative;
  top: -42px;
  right: -175px;
  cursor: pointer;
  user-select: none;
`;

const App = (props) => {
  const [students, setStudents] = useState(props.students);
  const [loading, setLoading] = useState(false);
  const [searchToggle, setSearchToggle] = useState(true);
  const [classOptions, setClassOptions] = useState([]);
  const [selectedClasses, setSelectedClasses] = useState([]);
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

  const handleFilter = () => {
    console.log("filter");
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
        {/* <ClassesFilter handleFilter={handleFilter} options={classOptions} /> */}
        <ToggleLabel onClick={handleSearchToggle}>
          Search by {searchToggle ? "Class" : "Name"}
        </ToggleLabel>
      </SearchBarContainer>
      <StudentsResults students={students} loading={loading}></StudentsResults>
    </div>
  );
};

const mapStateToProps = (state) => ({
  students: state.students,
});
export default connect(mapStateToProps)(App);
