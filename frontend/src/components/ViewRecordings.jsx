import React from 'react';
// import { useNavigate } from "react-router-dom";

const ViewRecordings = (props) => {
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
                <td>{item.title}</td>
                <td>{item.reader_id}</td>
                {/* {columns.map((column, columnIndex) => (
                  <td key={columnIndex}>{item[column]}</td>
                ))} */}
                <td>
                  <audio controls>
                    <source src={item.audio_file} type="audio/mpeg" />
                    Your browser does not support the audio element
                  </audio>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      );
    };

export default ViewRecordings;