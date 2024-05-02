import PropTypes from "prop-types";
import UpdateStatusDropdown from "../UpdateStatus/UpdateStatusDropdown";
import { updateConnectionStatus } from "../../services/connections";
import "./ViewConnections.css";
import profileImage from "../../assets/profile.png";

const ViewConnectionsCards = ({ data, view, onUpdate }) => {
  if (!data || data.length === 0) {
    return <p>No data available</p>;
  }
  const statusOptions = ["approved", "rejected"];
  return (
    <>
      <h2 className="connections-heading">Your Connections</h2>
      <div className="table-container">
        <div className="row row-cols-2 justify-content-center">
          {data.map((item, index) => (
            <div className="col mb-5" key={index}>
              <div
                className="card"
                id={`custom-card-${index}`}
                style={{
                  width: "18rem",
                  borderRadius: "50px",
                  boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
                }}
              >
                <i
                  className="fa-solid fa-user"
                  style={{
                    fontSize: "50px",
                    margin: "auto",
                  }}
                ></i>
                <div className="card-body">
                  {view === "parent" && (
                    <p className="card-text">
                      Username: {item.reader_username}
                    </p>
                  )}
                  {view === "reader" && (
                    <p className="card-text">
                      Username: {item.parent_username}
                    </p>
                  )}
                  <p>Status: {item.status}</p>

                  {view === "reader" && (
                    <div className="status-update">
                      <div className="dropdown-box">
                        <UpdateStatusDropdown
                          options={statusOptions}
                          item_id={item.id}
                          updateFunction={updateConnectionStatus}
                          onSubmit={onUpdate}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
          <div className="col"></div>
        </div>
      </div>
    </>
  );
};

ViewConnectionsCards.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
  view: PropTypes.oneOf(["parent", "reader"]).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default ViewConnectionsCards;
