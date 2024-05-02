import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import ParentConnectionsViewButton from "../../components/Connections/ParentConnectionsViewButton";
import ParentStoriesButton from "../../components/StoriesButton/ParentStoriesButton";
import ParentStoryRequestsButton from "../../components/StoryRequestsButton/ParentStoryRequestsButton";
import "../ReaderLandingPage/ReaderLandingPage.css";

export const ParentLandingPage = () => {
  const username = localStorage.getItem("username");
  const storedRole = localStorage.getItem("role");
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (storedRole === "parent") {
      if (username) {
        navigate("/familyhub");
      } else {
        navigate("/login");
      }
    } else {
      setErrorMessage("Unauthorised");
    }
  }, [username, storedRole, navigate]);

  return (
    <>
      {errorMessage ? (
        <p>{errorMessage}</p>
      ) : (
        <>
          <div style={{ marginTop: "3rem" }} className="container text-center">
            <h2 style={{ marginBottom: "3rem" }}>Family Hub</h2>
            <div className="row row-cols-3 justify-content-center">
              <div className="col">
                <div
                  className="card"
                  id="custom-card-storystudio"
                  style={{ width: "18rem" }}
                >
                  <Link to="/familyhubconnections">
                    <i className="fa-solid fa-children storystudioicons"></i>
                    <ParentConnectionsViewButton className="button-storystudio" />
                  </Link>
                </div>
              </div>
              <div className="col">
                <div
                  className="card"
                  style={{ width: "18rem" }}
                  id="custom-card-storystudio"
                >
                  <Link to="/familyhubrequests">
                    <i className="fa-brands fa-fort-awesome storystudioicons"></i>
                    <ParentStoryRequestsButton className="button-storystudio" />
                  </Link>
                </div>
              </div>
              <div className="col">
                <div
                  className="card"
                  style={{ width: "18rem" }}
                  id="custom-card-storystudio"
                >
                  <Link to="/familyhubstories">
                    <i className="fa-solid fa-book storystudioicons"></i>
                    <ParentStoriesButton className="button-storystudio" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};
