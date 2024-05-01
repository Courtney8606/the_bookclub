import { useNavigate } from "react-router-dom";

const CreateRecordingButton = ({ className }) => {
  const navigate = useNavigate();
  const handleSubmit = () => {
    navigate(`/storystudiorecording`);
  };

  return (
    <div className="recording-reader-view">
      <button
        type="button"
        onClick={handleSubmit}
        style={{
          marginTop: "30px",
        }}
      >
        Record a new story!
      </button>
    </div>
  );
};

export default CreateRecordingButton;
