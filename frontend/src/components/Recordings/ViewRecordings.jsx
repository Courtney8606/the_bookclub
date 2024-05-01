// import React from 'react';
import PropTypes from "prop-types";
import UpdateStatusDropdown from "../UpdateStatus/UpdateStatusDropdown";
import { updateRecordingStatus } from "../../services/recordings";
import { formatDate } from "../../services/formatting";
import { DeleteAudioButton } from "./DeleteRecording";
import "./ViewRecordings.css";

const ViewRecordings = ({ data, view, onUpdate }) => {
  if (data.message === "Unauthorised") {
    return <p>Unauthorised access</p>;
  }
  if (!data || data.length === 0) {
    return <p>No data available</p>;
  }
  const statusOptions = ["approved", "rejected"];

  return (
    <>
      <h2 className="recordings-heading">Your Recordings</h2>
      <table className="container-fluid recordingstable">
        <thead>
          <tr className="row-cols-5 recordings-row" id="recordings-row-one">
            <th>Date Recorded</th>
            <th>Recording Title</th>
            <th>Audio File</th>
            {view === "parent" && <th>From Reader</th>}
            {view === "reader" && <th>To Parent</th>}
            <th>Request Status</th>
            {view === "parent" && <th>Update response</th>}
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr
              className="row-cols-6 recordings-row"
              id="recordings-rows"
              key={index}
            >
              <td>{formatDate(item.date_recorded)}</td>
              <td>{item.title}</td>
              <td>
                <audio controls>
                  <source src={item.audio_file} type="audio/mpeg" />
                  Your browser does not support the audio element
                </audio>
              </td>
              {view === "parent" && <td>{item.reader_username}</td>}
              {view === "reader" && <td>{item.parent_username}</td>}
              <td>{item.recording_status}</td>
              {view === "parent" && (
                <td className="status-update">
                  <div className="dropdown-box">
                    {
                      <UpdateStatusDropdown
                        options={statusOptions}
                        item_id={item.id}
                        updateFunction={updateRecordingStatus}
                        onSubmit={onUpdate}
                      />
                    }
                  </div>
                </td>
              )}
              <td>
                <DeleteAudioButton
                  public_id={item.public_id}
                  recording_id={item.id}
                  onSubmit={onUpdate}
                />
              </td>
              <td></td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

ViewRecordings.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
  view: PropTypes.oneOf(["parent", "reader"]).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default ViewRecordings;
