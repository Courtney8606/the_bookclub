import { useNavigate } from "react-router-dom";

const ReaderStoriesButton = ({ className }) => {
  const navigate = useNavigate();
  const handleSubmit = () => {
    navigate(`/storystudiostories`);
  };

  return (
    <div className="stories-reader-view">
      <button
        type="button"
        className={`stories-reader-view-button ${className}`}
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

export default ReaderStoriesButton;
