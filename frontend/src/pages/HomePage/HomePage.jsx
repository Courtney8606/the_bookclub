import ParentViewButton from "../../components/ParentViewButton/ParentViewButton";
import ReaderViewButton from "../../components/ReaderViewButton/ReaderViewButton";
import ChildViewButton from "../../components/ChildViewButton/ChildViewButton";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import parentImage from "../../assets/parent.jpg";
import readerImage from "../../assets/reader3.jpg";
import childImage from "../../assets/child2.jpg";
import "./HomePage.css";

export const HomePage = () => {
  const username = localStorage.getItem("username");
  const storedRole = localStorage.getItem("role");
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (storedRole === "parent") {
      if (username) {
        navigate("/");
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
          <h3 style={{ marginTop: "2rem" }}>Welcome {username}!</h3>
          <p>Please select from the below</p>
          <div style={{ marginTop: "3rem" }} className="container text-center">
            <div className="row row-cols-3 justify-content-center">
              <div className="col">
                <div
                  className="card"
                  id="custom-card-homepage"
                  style={{ width: "18rem" }}
                >
                  <img
                    src={parentImage}
                    className="card-img-top"
                    alt="Card image cap"
                  />
                  <div className="card-body">
                    <p className="card-text">
                      Manage your family connections and approvals
                    </p>
                    <a href="#" className="btn btn-primary" id="custom-button">
                      <ParentViewButton className="button-two" />
                    </a>
                  </div>
                </div>
              </div>
              <div className="col">
                <div
                  className="card"
                  style={{ width: "18rem" }}
                  id="custom-card-homepage"
                >
                  <img
                    src={readerImage}
                    className="card-img-top"
                    alt="Card image cap"
                  />
                  <div className="card-body">
                    <p className="card-text">
                      View your story requests and start recording
                    </p>
                    <a href="#" className="btn btn-primary" id="custom-button">
                      <ReaderViewButton className="button-two" />
                    </a>
                  </div>
                </div>
              </div>
              <div className="col">
                <div
                  className="card"
                  style={{ width: "18rem" }}
                  id="custom-card-homepage"
                >
                  <img
                    src={childImage}
                    className="card-img-top"
                    alt="Card image cap"
                  />
                  <div className="card-body">
                    <p className="card-text">
                      Let your child safely request or listen to stories
                    </p>
                    <a href="#" className="btn btn-primary" id="custom-button">
                      <ChildViewButton />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};
