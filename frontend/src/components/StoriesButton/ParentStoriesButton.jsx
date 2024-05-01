import { useNavigate } from "react-router-dom";

const ParentStoriesButton = ({ className }) => {
  const navigate = useNavigate();
  const handleSubmit = () => {
    navigate(`/familyhubstories`);
  };

  return (
    <div className="stories-parent-view">
      <button
        type="button"
        className={`stories-parent-view-button ${className}`}
        onClick={handleSubmit}
        style={{
          backgroundColor: "transparent",
          border: "None",
        }}
      >
        Your stories
      </button>
    </div>
  );
};

export default ParentStoriesButton;
