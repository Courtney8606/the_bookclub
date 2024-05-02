import { useNavigate } from "react-router-dom";

const ChildModeStoriesButton = ({ className }) => {
  const navigate = useNavigate();
  const handleSubmit = () => {
    navigate(`/childstories`);
  };

  return (
    <div className="child-stories-view">
      <button
        type="button"
        className={`child-stories-button ${className}`}
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
        Your stories
      </button>
    </div>
  );
};

export default ChildModeStoriesButton;
