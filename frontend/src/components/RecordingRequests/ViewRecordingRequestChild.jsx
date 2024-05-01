import PropTypes from 'prop-types';
import { formatDate } from '../../services/formatting';
import { StatusIcon } from '../SmallVisualComponents/statusIcon';

const ViewRecordingRequestsChild = ({data}) => {
    if (!data || data.length === 0) {
        return <p>No data available</p>;
    }

    return (
        <>
        <h2>You have asked for already:</h2>
        <table>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <td>On <b>{formatDate(item.date_requested)}</b> you asked <b>{item.reader_username}</b> to read for you: <b>{item.request_description}</b></td>
                <td><StatusIcon status={item.reader_status}/></td>
              </tr>
            ))}
          </tbody>
        </table>
        </>
      );
    };

    ViewRecordingRequestsChild.propTypes = {
      data: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
  };
  
export default ViewRecordingRequestsChild;