// Filters.js
import React from "react";

const Filters = ({ handleSort, handleFieldChange }) => {
  return (
    <div>
      <select onChange={(e) => handleFieldChange(e.target.value)}>
        <option value="name.first">Name</option>
        <option value="name.last">Surname</option>
        <option value="email">Email</option>
        <option value="cell">Phone</option>
      </select>
      <button onClick={() => handleSort('asc')}>Sort Ascending</button>
      <button onClick={() => handleSort('desc')}>Sort Descending</button>
    </div>
  );
};

export default Filters;