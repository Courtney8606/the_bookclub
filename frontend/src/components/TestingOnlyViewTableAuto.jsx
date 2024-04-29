// import React from 'react';
import PropTypes from 'prop-types';
// import { useNavigate } from "react-router-dom";

// TESTING ONLY - THIS COMPONENT RENDERS A TABLE AUTOMATICALLY USING ALL HEADERS AND CONTENTS
// USEFUL FOR TESTING BUT NOT TO BE USED AS COMPONENT

const ViewTableAuto = ({data}) => {
    if (!data || data.length === 0) {
        return <p>No data available</p>;
    }
    
    const columns = Object.keys(data[0]);
    
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
            {data.map((item, index) => (
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

    ViewTableAuto.propTypes = {
      data: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired
  };
  
export default ViewTableAuto;