import { Link, useLocation } from "react-router-dom";
import "./NavigationBar.css";
import { Helmet } from "react-helmet-async";
import logoImage from "../../assets/logo.png";
import ParentViewButton from "../../components/ParentViewButton/ParentViewButton";
import ReaderViewButton from "../../components/ReaderViewButton/ReaderViewButton";
import LogoutButton from "../../components/LogoutButton/LogoutButton";

export const NavigationBar = () => {
  const username = localStorage.getItem("username");
  const location = useLocation();
  const showNavbar = !["/signup", "/login", "/child"].includes(
    location.pathname
  );

  if (!showNavbar) {
    return null; // Return null to not render the navbar
  }

  return (
    <div>
      <Helmet>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
          integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH"
          crossorigin="anonymous"
        />
      </Helmet>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            Logo
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a
                  className={
                    location.pathname === "/reader"
                      ? "nav-link active"
                      : "nav-link"
                  }
                  aria-current="page"
                  href="/reader"
                >
                  <ReaderViewButton />
                </a>
              </li>
              <li className="nav-item">
                <a
                  className={
                    location.pathname === "/parent"
                      ? "nav-link active"
                      : "nav-link"
                  }
                  aria-current="page"
                  href="/parent"
                >
                  <ParentViewButton />
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link">
                  <LogoutButton />
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link disabled" aria-disabled="true">
                  {username !== null ? `Signed in as ${username}` : null}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavigationBar;
