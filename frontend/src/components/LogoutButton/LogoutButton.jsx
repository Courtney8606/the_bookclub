import { useNavigate } from "react-router-dom";

const LogoutButton = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("username");
    navigate("/login");
  };

  return (
    <div className="logout">
      <button type="button" className="logout-button" onClick={logout}>
        Logout
      </button>
    </div>
  );
};

export default LogoutButton;
