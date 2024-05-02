import ParentViewButton from "../../components/ParentViewButton/ParentViewButton";
import ReaderViewButton from "../../components/ReaderViewButton/ReaderViewButton";
import ChildViewButton from "../../components/ChildViewButton/ChildViewButton";
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import recordingImage from "../../assets/recording.png";
import storyRequestsImage from "../../assets/storyrequests2.png";
import connectionsImage from "../../assets/family.png";
import ConnectionsViewButton from "../../components/Connections/ConnectionsViewButton";
import ReaderStoryRequestsButton from "../../components/ReaderStoryRequestsButton/ReaderStoryRequestsButton";
import ReaderStoriesButton from "../../components/ReaderStoriesButton/ReaderStoriesButton";
import childImage from "../../assets/child.jpg";
import "./ParentLandingPage.css";

export const ParentLandingPage = () => {
  const username = localStorage.getItem("username");
  const storedRole = localStorage.getItem("role");
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (storedRole === "parent") {
      if (username) {
        navigate("/storystudio");
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
            <div className="row row-cols-3 justify-content-center">
              <div className="col">
                <div
                  className="card"
                  id="custom-card-storystudio"
                  style={{ width: "18rem" }}
                >
                  <Link to="/storystudioconnections">
                    <img
                      src={connectionsImage}
                      className="card-img-top-storystudio"
                      alt="Card image cap"
                    />
                    <ConnectionsViewButton className="button-storystudio" />
                  </Link>
                </div>
              </div>
              <div className="col">
                <div
                  className="card"
                  style={{ width: "18rem" }}
                  id="custom-card-storystudio"
                >
                  <Link to="/storystudioconnections">
                    <img
                      src={storyRequestsImage}
                      className="card-img-top-storystudio"
                      alt="Card image cap"
                    />
                    <ReaderStoryRequestsButton className="button-storystudio" />
                  </Link>
                </div>
              </div>
              <div className="col">
                <div
                  className="card"
                  style={{ width: "18rem" }}
                  id="custom-card-storystudio"
                >
                  <Link to="/storystudioconnections">
                    <img
                      src={recordingImage}
                      className="card-img-top-storystudio"
                      alt="Card image cap"
                    />
                    <ReaderStoriesButton className="button-storystudio" />
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
