import { useNavigate } from "react-router-dom";

const ParentViewButton = () => {
  const navigate = useNavigate();
  const handleSubmit = () => {
    navigate(`/parent`);
  };

  return (
    <div className="parent-view">
      <button
        type="button"
        className="parent-view-button"
        onClick={handleSubmit}
        style={{ backgroundColor: "transparent" }}
      >
        Parent View
      </button>
    </div>
  );
};

export default ParentViewButton;
