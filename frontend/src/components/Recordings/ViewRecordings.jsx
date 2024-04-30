
import PropTypes from 'prop-types';
import UpdateStatusDropdown from '../UpdateStatus/UpdateStatusDropdown';
import { updateRecordingStatus } from '../../services/recordings';
import { formatDate } from '../../services/formatting';


const ViewRecordings = ({data, view, onUpdate}) => {
  if (data.message === "Unauthorised") {
    return <p>Unauthorised access</p>;
  }
    if (!data || data.length === 0) {
        return <p>No data available</p>;
    }
    const statusOptions = ["approved", "rejected"]

    return (
      <>
        <h2>Recordings</h2>
        <table>
          <thead>
            <tr>
                <th>Date Recorded</th>
                <th>Recording Title</th>
                <th>Audio File</th>
                {view === 'parent' &&<th>From Reader</th>}
                {view === 'reader' && <th>To Parent</th>}
                <th>Request Status</th>
                {view === 'parent' && <th>Update response</th>}
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <td>{formatDate(item.date_recorded)}</td>
                <td>{item.title}</td>
                <td>
                  <audio controls>
                    <source src={item.audio_file} type="audio/mpeg" />
                    Your browser does not support the audio element
                  </audio>
                </td>
                {view === 'parent' &&<td>{item.reader_username}</td>}
                {view === 'reader' &&<td>{item.parent_username}</td>}
                <td>{item.recording_status}</td>
                {view === 'parent' && <td>{ 
                <UpdateStatusDropdown options = {statusOptions} item_id={item.id} updateFunction={updateRecordingStatus} onSubmit={onUpdate}/>}</td>}
              </tr>
            ))}
          </tbody>
        </table>
        </>
      );
    };

    ViewRecordings.propTypes = {
      data: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
      view: PropTypes.oneOf(['parent', 'reader']).isRequired,
      onUpdate: PropTypes.func.isRequired
  };
  
export default ViewRecordings;