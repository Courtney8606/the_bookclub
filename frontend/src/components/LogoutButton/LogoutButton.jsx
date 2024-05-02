import { useNavigate } from "react-router-dom";
import { logoutservice } from "../../services/logout";

const LogoutButton = ({ className }) => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("username");
    logoutservice();
    navigate("/login");
  };

  return (
    <div className="logout">
      <button
        type="button"
        className={`logout-button ${className}`}
        onClick={logout}
        style={{
          backgroundColor: "transparent",
          border: "None",
          color: "#00215e",
        }}
      >
        Logout
      </button>
    </div>
  );
};

export default LogoutButton;
