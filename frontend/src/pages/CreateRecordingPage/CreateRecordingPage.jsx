import CreateRecording from "../../components/Recordings/CreateRecording";
import { getRecordingsByReader } from "../../services/recordings";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getConnectionsByReader } from "../../services/connections";

export const CreateRecordingPage = () => {
  const username = localStorage.getItem("username");
  const [recordings, setRecordings] = useState([]);
  const [connections, setConnections] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();

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

  const getAllConnectionsTrigger = async (username) => {
    getConnectionsByReader(username).then((data) => {
      console.log(data);
      const allConnections = data;
      console.log(allConnections);
      setConnections(allConnections);
    });
  };

  useEffect(() => {
    getAllRecordingsTrigger(username);
    getAllConnectionsTrigger(username);
  }, [navigate]);

  return (
    <>
      {errorMessage ? (
        <p>{errorMessage}</p>
      ) : (
        <>
          <h2
            style={{
              marginTop: "30px",
              marginBottom: "30px",
              color: "#00215e",
            }}
          >
            Record a new story
          </h2>
          <CreateRecording
            username={username}
            connections={connections}
            onSubmit={getAllRecordingsTrigger}
          />
        </>
      )}
    </>
  );
};
