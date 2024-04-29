// import React from 'react';
import PropTypes from 'prop-types';
import UpdateStatusDropdown from '../UpdateStatus/UpdateStatusDropdown';
import { updateConnectionStatus } from '../../services/connections';
// import { useNavigate } from "react-router-dom";

const ViewConnections = ({data, view, onUpdate}) => {
    if (!data || data.length === 0) {
        return <p>No data available</p>;
    }
    const statusOptions = ["approved", "rejected"]
    return (
        <>
        <h2>Connections</h2>
        <table>
          <thead>
            <tr>
                {view === 'parent' &&<th>Reader Connections</th>}
                {view === 'reader' && <th>Parent Connections</th>}
                <th>Status</th>
                {view === 'reader' && <th>Update Status</th>}

            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                {view === 'parent' &&<td>{item.reader_username}</td>}
                {view === 'reader' &&<td>{item.parent_username}</td>}
                <td>{item.status}</td>
                {view === 'reader' && <td>{<UpdateStatusDropdown options = {statusOptions} item_id={item.id} updateFunction={updateConnectionStatus} onSubmit={onUpdate}/>}</td>}
              </tr>
            ))}
          </tbody> 
        </table>
        </>
      );
    };

    ViewConnections.propTypes = {
      data: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
      view: PropTypes.oneOf(['parent', 'reader']).isRequired,
      onUpdate: PropTypes.func.isRequired
  };
  
export default ViewConnections;