import Select from "react-select";
import makeAnimated from "react-select/animated";
import styled from "styled-components";

const animatedComponents = makeAnimated();

const StyledSelect = styled(Select)`
  border-radius: 25px;
`;

const customStyles = {
  control: (base, state) => ({
    height: "50px",
    width: "500px",
    backgroundColor: "white",
    border: "2px solid",
    borderRadius: "15px",
    cursor: "pointer",
    textAlign: "left",
  }),

  option: (styles, { isFocused }) => {
    return {
      ...styles,
      cursor: "pointer",
      color: isFocused ? "white" : "black",
      lineHeight: 2,
    };
  },

  input: (styles) => ({
    ...styles,
    color: "black",
    padding: "8px 5px",
  }),

  menu: (styles) => ({
    ...styles,
    marginTop: 0,
    boxShadow: "none",
    borderRadius: 0,
    backgroundColor: "#dbe9e3",
  }),

  singleValue: (styles) => ({
    ...styles,
    color: "rgba(255, 80, 86)",
  }),

  indicatorsContainer: (styles) => ({
    ...styles,
  }),
};
const ClassesFilter = ({ handleFilter, options }) => {
  return (
    <div>
      <StyledSelect
        isMulti
        name="classes-filter"
        options={options}
        placeholder="Select from classes"
        onChange={(val) => {
          handleFilter(val);
        }}
        components={animatedComponents}
        className="filter-bar"
        classNamePrefix="filter-bar"
        styles={customStyles}
      />
    </div>
  );
};

export default ClassesFilter;
