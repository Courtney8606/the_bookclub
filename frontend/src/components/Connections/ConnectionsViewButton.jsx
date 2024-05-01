import { useNavigate } from "react-router-dom";

const ConnectionsViewButton = ({ className }) => {
  const navigate = useNavigate();
  const handleSubmit = () => {
    navigate(`/storystudioconnections`);
  };

  return (
    <div className="connections-reader-view">
      <button
        type="button"
        className={`connections-reader-view-button ${className}`}
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

export default ConnectionsViewButton;
