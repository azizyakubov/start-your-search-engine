import Select from "react-select";
import makeAnimated from "react-select/animated";
import styled from "styled-components";

const animatedComponents = makeAnimated();

const StyledSelect = styled(Select)`
  border-radius: 25px;
`;

const customStyles = {
  control: (base, state) => ({
    // ...base,
    // fontSize: 18,
    height: "60px",
    width: "500px",
    backgroundColor: "white",
    border: "1px solid",
    borderRadius: "25px",
    cursor: "pointer",
    textAlign: "left",
    // padding: "15px",
  }),

  option: (styles, { isFocused }) => {
    return {
      ...styles,
      cursor: "pointer",
      backgroundColor: isFocused ? "white" : "white",
      color: isFocused ? "rgba(255, 80, 86)" : "black",
      lineHeight: 2,
    };
  },

  input: (styles) => ({
    ...styles,
    color: "black",
    padding: "14px 5px",
  }),

  menu: (styles) => ({
    ...styles,
    marginTop: 0,
    boxShadow: "none",
    borderRadius: 0,
  }),

  singleValue: (styles) => ({
    ...styles,
    color: "rgba(255, 80, 86)",
  }),

  indicatorsContainer: (styles) => ({
    // display: "none",
    position: "absolute",
    right: "0px",
    top: "13px",
  }),
  // valueContainer: (styles) => ({
  //   padding: "14px 7px",
  // }),
};
const ClassesFilter = ({ handleFilter, options }) => {
  return (
    <div>
      <StyledSelect
        isMulti
        name="classes-filter"
        options={options}
        placeholder="Select from classes"
        components={{
          DropdownIndicator: () => null,
          IndicatorSeparator: () => null,
        }}
        onChange={handleFilter}
        className="filter-bar"
        classNamePrefix="filter-bar"
        styles={customStyles}
      />
    </div>
  );
};

export default ClassesFilter;
