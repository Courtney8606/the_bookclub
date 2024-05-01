import { useNavigate } from "react-router-dom";

const NotificationsPageButton = () => {
  const navigate = useNavigate();
  const handleSubmit = () => {
    navigate(`/notifications`);
  };

  return (
    <div className="notifications-view">
      <button
        type="button"
        className="notifications-page-button"
        onClick={handleSubmit}
        style={{
          backgroundColor: "transparent",
          border: "None",
          color: "#00215e",
        }}
      >
        Notifications
      </button>
    </div>
  );
};

export default NotificationsPageButton;
