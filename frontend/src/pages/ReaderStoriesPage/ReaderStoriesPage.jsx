import ViewRecordings from "../../components/Recordings/ViewRecordings";
import { getRecordingsByReader } from "../../services/recordings";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CreateRecordingButton from "../../components/Recordings/CreateRecordingButton";

export const ReaderStoriesPage = () => {
  const username = localStorage.getItem("username");
  const [recordings, setRecordings] = useState([]);
  const storedRole = localStorage.getItem("role");
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();
  const view = "reader";

  const getAllRecordingsTrigger = async (username) => {
    try {
      const response = await getRecordingsByReader(username);
      if (response.message === "Unauthorised") {
        setErrorMessage("Unauthorised");
      } else {
        const allRecordings = response;
        allRecordings.sort(
          (a, b) => new Date(b.date_recorded) - new Date(a.date_recorded)
        );
        await setRecordings(allRecordings);
      }
    } catch (error) {
      console.error("Error fetching data");
      setErrorMessage("Error fetching data");
    }
  };

  useEffect(() => {
    if (storedRole === "parent") {
      if (username) {
        navigate("/storystudiostories");
        getAllRecordingsTrigger(username);
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
          <ViewRecordings
            data={recordings}
            view={view}
            onUpdate={getAllRecordingsTrigger}
          />
          <CreateRecordingButton />
        </>
      )}
    </>
  );
};
