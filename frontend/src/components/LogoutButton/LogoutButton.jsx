import { useNavigate } from "react-router-dom";
import { logoutservice } from "../../services/logout";

const LogoutButton = () => {
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
        className="logout-button"
        onClick={logout}
        style={{ backgroundColor: "transparent" }}
      >
        Logout
      </button>
    </div>
  );
};

export default LogoutButton;
