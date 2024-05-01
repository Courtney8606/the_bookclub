import { useNavigate } from "react-router-dom";

const ReaderViewButton = ({ className }) => {
  const navigate = useNavigate();
  const handleSubmit = () => {
    navigate(`/storystudio`);
  };

  return (
    <div className="reader-view">
      <button
        type="button"
        className={`reader-view-button ${className}`}
        onClick={handleSubmit}
        style={{
          backgroundColor: "transparent",
          border: "None",
        }}
      >
        Story Studio
      </button>
    </div>
  );
};

export default ReaderViewButton;
