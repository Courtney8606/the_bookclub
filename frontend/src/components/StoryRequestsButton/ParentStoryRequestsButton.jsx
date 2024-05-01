import { useNavigate } from "react-router-dom";

const ParentStoryRequestsButton = ({ className }) => {
  const navigate = useNavigate();
  const handleSubmit = () => {
    navigate(`/familyhubstoryrequests`);
  };

  return (
    <div className="requests-parent-view">
      <button
        type="button"
        className={`requests-parent-view-button ${className}`}
        onClick={handleSubmit}
        style={{
          backgroundColor: "transparent",
          border: "None",
        }}
      >
        Story Requests
      </button>
    </div>
  );
};

export default ParentStoryRequestsButton;
