import { useState, useEffect } from "react";
import { useDataContext } from "../../data/data";
import { useNavigate } from "react-router-dom";
import {
  updateConnectionsDisplayIcon,
  updateRecordingRequestsDisplayIcon,
} from "../../services/notifications";

export const NotificationsPage = () => {
  const username = localStorage.getItem("username");
  const navigate = useNavigate();
  const {
    connectionsParent,
    connectionsReader,
    recordingRequestsParent,
    recordingRequestsReader,
  } = useDataContext();
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const allNotifications = [];

    const approvedConnection = connectionsParent.find(
      (connection) =>
        connection.status === "approved" && connection.display_message_icon
    );
    if (approvedConnection) {
      allNotifications.push(
        `Your connection request to ${approvedConnection.reader_id} has been approved!`
      );
    }
    const pendingConnectionReader = connectionsReader.find(
      (connection) =>
        connection.status === "pending" && connection.display_message_icon
    );
    if (pendingConnectionReader) {
      allNotifications.push(
        `You have received a connection request from ${pendingConnectionReader.parent_id}. Head to your Reader account page to manage this request.`
      );
    }
    const rejectedConnectionParent = connectionsParent.find(
      (connection) =>
        connection.status === "rejected" && connection.display_message_icon
    );
    if (rejectedConnectionParent) {
      allNotifications.push(
        `Your connection request to ${rejectedConnectionParent.reader_id} has been rejected.`
      );
    }
    const pendingRequestReader = recordingRequestsReader.find(
      (request) =>
        request.reader_status === "pending" && request.display_message_icon
    );
    if (pendingRequestReader) {
      allNotifications.push(
        `You have been sent a story request by ${pendingRequestReader.parent_id}. Head over to your Reader account page to review the details.`
      );
    }
    const acceptedRequestParent = recordingRequestsParent.find(
      (request) =>
        request.reader_status === "accepted" && request.display_message_icon
    );
    if (acceptedRequestParent) {
      allNotifications.push(
        `Your story request has been accepted by ${acceptedRequestParent.reader_id}. Get ready for a story coming your way soon!`
      );
    }
    const rejectedRequestParent = recordingRequestsParent.find(
      (request) =>
        request.reader_status === "rejected" && request.display_message_icon
    );
    if (rejectedRequestParent) {
      allNotifications.push(
        `Your story request has been rejected by ${rejectedRequestParent.reader_id}. Get ready for a story coming your way soon!`
      );
    }
    const completedRequestParent = recordingRequestsParent.find(
      (request) =>
        request.reader_status === "completed" && request.display_message_icon
    );
    if (completedRequestParent) {
      allNotifications.push(
        `Your story request to ${completedRequestParent.reader_id} has been marked as complete.`
      );
    }
    setNotifications(allNotifications);
  }, [
    connectionsParent,
    connectionsReader,
    recordingRequestsParent,
    recordingRequestsReader,
    navigate,
  ]);

  const handleClearNotifications = async () => {
    try {
      await Promise.all([
        updateConnectionsDisplayIcon(),
        updateRecordingRequestsDisplayIcon(),
      ]);
      setNotifications([]);
    } catch (error) {
      console.error("Error updating display_message_icon:", error);
    }
  };

  return (
    <>
      <h3>Notifications</h3>
      {notifications.map((notification, index) => (
        <div key={index}>{notification}</div>
      ))}
      {notifications.length > 0 && (
        <button onClick={handleClearNotifications}>Clear Notifications</button>
      )}
    </>
  );
};
