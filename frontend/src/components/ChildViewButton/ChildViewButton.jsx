import { useNavigate } from "react-router-dom";
import { childSafetyMode } from "../../services/childSafetyMode";

const ChildViewButton = ({ className }) => {
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
        className={`child-view-button ${className}`}
        onClick={handleSubmit}
        // style={{ backgroundColor: "transparent", border: "None" }}
      >
        Child Mode
      </button>
    </div>
  );
};

export default ChildViewButton;
