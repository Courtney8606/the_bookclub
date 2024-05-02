import PropTypes from "prop-types";
import UpdateStatusDropdown from "../UpdateStatus/UpdateStatusDropdown";
import { updateConnectionStatus } from "../../services/connections";
import "./ViewConnections.css";

const ViewConnections = ({ data, view, onUpdate }) => {
  if (!data || data.length === 0) {
    return <p>No data available</p>;
  }
  const statusOptions = ["approved", "rejected"];
  return (
    <>
      <h2 className="connections-heading">Your Connections</h2>
      <div className="table-container">
        <table className="connectionstable">
          <thead>
            <tr className="row-cols-3 connections-row" id="connections-row-one">
              {view === "reader" && <th>Your Connections</th>}
              {view === "parent" && <th>Your Connections</th>}
              <th>Status</th>
              {view === "reader" && <th>Update Status</th>}
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr
                className="row-cols-3 connections-row"
                id="connections-rows"
                key={index}
              >
                {view === "parent" && <td>{item.reader_username}</td>}
                {view === "reader" && <td>{item.parent_username}</td>}
                <td>{item.status}</td>
                {view === "reader" && (
                  <td className="status-update">
                    <div className="dropdown-box">
                      {
                        <UpdateStatusDropdown
                          options={statusOptions}
                          item_id={item.id}
                          updateFunction={updateConnectionStatus}
                          onSubmit={onUpdate}
                        />
                      }
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

ViewConnections.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
  view: PropTypes.oneOf(["parent", "reader"]).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default ViewConnections;
