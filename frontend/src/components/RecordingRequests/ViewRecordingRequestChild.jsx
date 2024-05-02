import PropTypes from "prop-types";
import { formatDate } from "../../services/formatting";
import { StatusIcon } from "../SmallVisualComponents/statusIcon";
import "./ViewRecordingRequestsChild.css";

const ViewRecordingRequestsChild = ({ data }) => {
  if (!data || data.length === 0) {
    return <p>No data available</p>;
  }

  return (
    <>
      <div>
        <div className="childrequeststable">
          <table>
            <thead>
              <tr>
                <th colSpan="3">
                  <h2 className="child-recordings-heading">
                    In the past, you've asked for:
                  </h2>
                </th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={index}>
                  <td>
                    On <b>{formatDate(item.date_requested)}</b> you asked{" "}
                    <b>{item.reader_username}</b> to read for you:{" "}
                    <b>{item.request_description}</b>
                  </td>
                  <td>
                    <StatusIcon status={item.reader_status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

ViewRecordingRequestsChild.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
};

export default ViewRecordingRequestsChild;
