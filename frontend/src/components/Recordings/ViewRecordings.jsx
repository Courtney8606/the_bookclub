// import React from 'react';
import PropTypes from 'prop-types';

// import { useNavigate } from "react-router-dom";

const ViewRecordings = ({data, view}) => {
    if (!data || data.length === 0) {
        return <p>No data available</p>;
    }
    
    return (
      <>
        <h2>Recordings</h2>
        <table>
          <thead>
            <tr>
                <th>Recording Title</th>
                <th>Audio File</th>
                {view === 'parent' &&<th>From Reader</th>}
                {view === 'reader' && <th>To Parent</th>}
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <td>{item.title}</td>
                <td>{item.audio_file}</td>
                {view === 'parent' &&<td>{item.reader_username}</td>}
                {view === 'reader' &&<td>{item.parent_username}</td>}
              </tr>
            ))}
          </tbody>
        </table>
        </>
      );
    };

    ViewRecordings.propTypes = {
      data: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
      view: PropTypes.oneOf(['parent', 'reader']).isRequired
  };
  
export default ViewRecordings;