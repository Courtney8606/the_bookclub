import React from "react";
// import { useNavigate } from "react-router-dom";

const ViewRecordings = (props) => {
  if (props.data.message === "Unauthorised") {
    return <p>Unauthorised access</p>;
  }

  if (!props.data || props.data.length === 0) {
    return <p>No data available</p>;
  }

  const columns = Object.keys(props.data[0]);

  return (
    <table>
      <thead>
        <tr>
          {columns.map((column, index) => (
            <th key={index}>{column}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {props.data.map((item, index) => (
          <tr key={index}>
            {columns.map((column, columnIndex) => (
              <td key={columnIndex}>{item[column]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ViewRecordings;
