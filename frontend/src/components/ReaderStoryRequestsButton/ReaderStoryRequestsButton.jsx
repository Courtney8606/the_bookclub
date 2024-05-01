import { useNavigate } from "react-router-dom";

const ReaderStoryRequestsButton = ({ className }) => {
  const navigate = useNavigate();
  const handleSubmit = () => {
    navigate(`/storystudiorequests`);
  };

  return (
    <div className="requests-reader-view">
      <button
        type="button"
        className={`requests-reader-view-button ${className}`}
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

export default ReaderStoryRequestsButton;
