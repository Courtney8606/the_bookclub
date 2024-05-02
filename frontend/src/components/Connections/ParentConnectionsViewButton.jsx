import { useNavigate } from "react-router-dom";

const ParentConnectionsViewButton = ({ className }) => {
  const navigate = useNavigate();
  const handleSubmit = () => {
    navigate(`/familyhubconnections`);
  };

  return (
    <div className="connections-parent-view">
      <button
        type="button"
        className={`connections-parent-view-button ${className}`}
        onClick={handleSubmit}
        style={{
          backgroundColor: "transparent",
          border: "None",
        }}
      >
        Connections
      </button>
    </div>
  );
};

export default ParentConnectionsViewButton;
