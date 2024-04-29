import { useNavigate } from "react-router-dom";

const ReaderViewButton = () => {
  const navigate = useNavigate();
  const handleSubmit = () => {
    navigate(`/reader`);
  };

  return (
    <div className="reader-view">
      <button
        type="button"
        className="reader-view-button"
        onClick={handleSubmit}
        style={{ backgroundColor: "transparent" }}
      >
        Reader View
      </button>
    </div>
  );
};

export default ReaderViewButton;
