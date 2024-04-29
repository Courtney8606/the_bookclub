import { useNavigate } from "react-router-dom";
import { childSafetyMode } from "../../services/childSafetyMode";

const ChildViewButton = () => {
  const navigate = useNavigate();
  const handleSubmit = () => {
    childSafetyMode();
    localStorage.setItem("role", "child");
    navigate(`/child`);
  };

  return (
    <div className="child-view">
      <button
        type="button"
        className="child-view-button"
        onClick={handleSubmit}
      >
        Child View
      </button>
    </div>
  );
};

export default ChildViewButton;
