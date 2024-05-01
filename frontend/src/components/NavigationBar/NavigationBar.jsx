import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import "./NavigationBar.css";
import logoImage from "../../assets/logo.png";
import ParentViewButton from "../../components/ParentViewButton/ParentViewButton";
import ReaderViewButton from "../../components/ReaderViewButton/ReaderViewButton";
import LogoutButton from "../../components/LogoutButton/LogoutButton";
import { useDataContext } from "../../data/data";
import NotificationsPageButton from "../NotificationsPageButton/NotificationsPageButton";
import "bootstrap/dist/css/bootstrap.min.css";
import "./NavigationBar.css";

export const NavigationBar = () => {
  // const username = localStorage.getItem("username");
  const location = useLocation();
  const [showNewMessage, setShowNewMessage] = useState(false);
  const showNavbar = !["/signup", "/login", "/child"].includes(
    location.pathname
  );
  const {
    connectionsParent,
    connectionsReader,
    recordingRequestsParent,
    recordingRequestsReader,
    recordingsReader,
    recordingsParent
  } = useDataContext();

  useEffect(() => {
    const newMessage =
      connectionsParent.some(
        (connection) =>
          connection.display_message_icon && connection.status === "approved"
      ) ||
      connectionsReader.some(
        (connection) =>
          connection.display_message_icon &&
          (connection.status === "pending" || connection.status === "rejected")
      ) ||
      recordingRequestsParent.some(
        (request) =>
          request.display_message_icon &&
          (request.reader_status === "accepted" ||
            request.reader_status === "rejected" ||
            request.reader_status === "completed")
      ) ||
      recordingRequestsReader.some(
        (request) =>
          request.display_message_icon && request.reader_status === "pending"
      ) ||
      recordingsReader.some(
        (request) =>
          request.display_message_icon && (request.recording_status === "accepted" ||
          request.recording_status === "rejected")
      )||
      recordingRequestsParent.some(
        (request) =>
          request.display_message_icon && request.reader_status === "pending"
      );
    setShowNewMessage(newMessage);
  }, [
    connectionsParent,
    connectionsReader,
    recordingRequestsParent,
    recordingRequestsReader,
    recordingsReader,
    recordingsParent
  ]);

  if (!showNavbar) {
    return null; // Return null to not render the navbar
  }

  return (
    <div>
      {/* <Helmet>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
          integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH"
          crossorigin="anonymous"
        />
      </Helmet> */}
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
            <img
              className="LogoImage"
              role="logoImg"
              alt="logo"
              src={logoImage}
            />
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
                    location.pathname === "/parent"
                      ? "nav-link active"
                      : "nav-link"
                  }
                  aria-current="page"
                  href="/parent"
                >
                  <ParentViewButton className="button-one" />
                </a>
              </li>
              <li className="nav-item">
                <a
                  className={
                    location.pathname === "/storystudio"
                      ? "nav-link active"
                      : "nav-link"
                  }
                  aria-current="page"
                  href="/storystudio"
                >
                  <ReaderViewButton className="button-one" />
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  id="notifications"
                  style={{ backgroundColor: "transparent", border: "None" }}
                >
                  <NotificationsPageButton />
                  {showNewMessage && ( // Conditional rendering of New Message
                    <p className="alignment message">
                      New <span id="message-icon">&#9993;</span>
                    </p>
                  )}
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link">
                  <LogoutButton />
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
