import ViewRecordingRequests from "../../components/RecordingRequests/ViewRecordingRequests";
import { getRecordingRequestsByReader } from "../../services/recordings";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const ReaderStoryRequestsPage = () => {
  const username = localStorage.getItem("username");
  const [errorMessage, setErrorMessage] = useState(null);
  const [recordingRequests, setRecordingRequests] = useState([]);
  const navigate = useNavigate();
  const view = "reader";
  const storedRole = localStorage.getItem("role");

  useEffect(() => {
    if (storedRole === "parent") {
      if (username) {
        navigate("/storystudiorequests");
        getAllRecordingRequestsTrigger(username);
      } else {
        navigate("/login");
      }
    } else {
      setErrorMessage("Unauthorised");
    }
  }, [username, storedRole, navigate]);

  const getAllRecordingRequestsTrigger = async (username) => {
    try {
      const response = await getRecordingRequestsByReader(username);
      if (response.message === "Unauthorised") {
        setErrorMessage("Unauthorised");
      } else {
        const allRecordingRequests = response;
        allRecordingRequests.sort(
          (a, b) => new Date(b.date_requested) - new Date(a.date_requested)
        );
        await setRecordingRequests(allRecordingRequests);
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
          <ViewRecordingRequests
            data={recordingRequests}
            view={view}
            onUpdate={getAllRecordingRequestsTrigger}
          />
        </>
      )}
    </>
  );
};
