import PropTypes from 'prop-types';
import { formatDate } from '../../services/formatting';
import UpdateStatusDropdown from '../UpdateStatus/UpdateStatusDropdown';
import { updateRecordingRequestStatus } from '../../services/recordings';

const ViewRecordingRequests = ({data, view, onUpdate}) => {
    if (!data || data.length === 0) {
        return <p>No data available</p>;
    }
    const statusOptions = ["accepted", "rejected", "completed"]
    return (
        <>
        <h2>Recording Requests</h2>
        <table>
          <thead>
            <tr>
                <th>Date requested</th>
                <th>Request</th>
                {view === 'parent' &&<th>Reader Requested</th>}
                {view === 'reader' && <th>Requested By</th>}
                <th>Request Status</th>
                {view === 'reader' && <th>Update response</th>}
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <td>{formatDate(item.date_requested)}</td>
                <td>{item.request_description}</td>
                {view === 'parent' &&<td>{item.reader_username}</td>}
                {view === 'reader' &&<td>{item.parent_username}</td>}
                <td>{item.reader_status}</td>
                {view === 'reader' && <td>{ 
                <UpdateStatusDropdown options = {statusOptions} item_id={item.id} updateFunction={updateRecordingRequestStatus} onSubmit={onUpdate}/>}</td>}
              </tr>
            ))}
          </tbody>
        </table>
        </>
      );
    };

    ViewRecordingRequests.propTypes = {
      data: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
      view: PropTypes.oneOf(['parent', 'reader']).isRequired,
      onUpdate: PropTypes.func.isRequired
  };
  
export default ViewRecordingRequests;