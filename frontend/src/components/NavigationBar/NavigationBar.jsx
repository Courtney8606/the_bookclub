import { Link, useLocation } from "react-router-dom";
import "./NavigationBar.css";
// import logoImage from "../../assets/logo.png";
import ParentViewButton from "../../components/ParentViewButton/ParentViewButton";
import ReaderViewButton from "../../components/ReaderViewButton/ReaderViewButton";
import LogoutButton from "../../components/LogoutButton/LogoutButton";

export const NavigationBar = () => {
  const username = localStorage.getItem("username");
  const location = useLocation();
  const showNavbar = !["/signup", "/login"].includes(location.pathname);

  if (!showNavbar) {
    return null; // Return null to not render the navbar
  }

  return (
    <div>
      <nav>
        <div className="navbarBox">
          <Link to="/" className="navbarLogo" id="navbarLogo">
            {/* <img
              className="BookclubImage"
              role="logoImg"
              alt="Bookclublogo"
              src={logoImage}
            ></img> */}
          </Link>
          <ReaderViewButton />
          <ParentViewButton />
          <LogoutButton />
          <div className="signedInInfo">
            {username !== null ? `Signed in as ${username}` : null}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavigationBar;
