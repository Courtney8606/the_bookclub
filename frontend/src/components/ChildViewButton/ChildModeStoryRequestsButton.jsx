import { useNavigate } from "react-router-dom";

const ChildModeStoryRequestsButton = ({ className }) => {
  const navigate = useNavigate();
  const handleSubmit = () => {
    navigate(`/childstoryrequests`);
  };

  return (
    <div className="child-story-requests-view">
      <button
        type="button"
        className={`child-story-requests-button ${className}`}
        onClick={handleSubmit}
        style={{
          backgroundColor: "white",
          border: "2px solid #e72ba5",
          color: "#e72ba5",
          height: "70px",
          width: "200px",
          fontSize: "20px",
        }}
      >
        Request a Story
      </button>
    </div>
  );
};

export default ChildModeStoryRequestsButton;
