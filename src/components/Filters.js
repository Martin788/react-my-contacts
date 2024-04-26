// Filters.js
import React from "react";

const Filters = ({ handleSort, handleFieldChange }) => {
  return (
    <div class="flex items-center space-x-4 mb-4 md:mb-0">
  <select class="border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:ring focus:border-blue-300" onChange={(e) => handleFieldChange(e.target.value)}>
    <option value="name.first">Name</option>
    <option value="name.last">Surname</option>
    <option value="email">Email</option>
    <option value="cell">Phone</option>
  </select>
  <button class="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-1 rounded-lg" onClick={() => handleSort("asc")}>Sort Ascending</button>
  <button class="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-1 rounded-lg" onClick={() => handleSort("desc")}>Sort Descending</button>
</div>

  );
};

export default Filters;
