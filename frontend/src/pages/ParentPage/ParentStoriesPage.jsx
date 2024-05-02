import { getRecordingsByParent } from "../../services/recordings";
import ViewRecordings from "../../components/Recordings/ViewRecordings";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const ParentStoriesPage = () => {
  const [errorMessage, setErrorMessage] = useState(null);
  const username = localStorage.getItem("username");
  const [recordings, setRecordings] = useState([]);

  const storedRole = localStorage.getItem("role");
  const navigate = useNavigate();
  const view = "parent";

  useEffect(() => {
    if (storedRole === "parent") {
      if (username) {
        navigate("/familyhubstories");
        getAllRecordingsTrigger(username);
      } else {
        navigate("/login");
      }
    } else {
      setErrorMessage("Unauthorised");
    }
  }, [username, storedRole, navigate]);

  const getAllRecordingsTrigger = async (username) => {
    try {
      const response = await getRecordingsByParent(username);
      if (response.message === "Unauthorised") {
        setErrorMessage("Unauthorised");
      } else {
        const allRecordings = response;
        allRecordings.sort(
          (a, b) => new Date(b.date_recorded) - new Date(a.date_recorded)
        );
        setRecordings(allRecordings);
      }
    } catch (error) {
      console.error("Error fetching data");
      setErrorMessage("Error fetching data");
    }
  };

  return (
    <>
      {errorMessage ? (
        <p>{errorMessage}</p>
      ) : (
        <>
          <div>
            <div>
              <div>
                <div>
                  <ViewRecordings
                    data={recordings}
                    view={view}
                    onUpdate={getAllRecordingsTrigger}
                  />
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};
