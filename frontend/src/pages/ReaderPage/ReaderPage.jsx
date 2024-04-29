import CreateRecording from "../../components/Recordings/CreateRecording"
import ViewRecordings from "../../components/ViewRecordings";
import { getRecordingsByReader } from "../../../services/recordings";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ChildViewButton from "../../components/ChildViewButton/ChildViewButton";

export const ReaderPage = () => {
  const [errorMessage, setErrorMessage] = useState(null);
  const username = localStorage.getItem("username");
  const [recordings, setRecordings] = useState([]);
  const navigate = useNavigate();

  const getAllRecordingsTrigger = async (username) => {
    try {
      const response = await getRecordingsByReader(username);
      if (response.message === "Unauthorised") {
        setErrorMessage("Unauthorised");
      } else {
        setRecordings(response);
      }
    } catch (error) {
      console.error("Error fetching data");
      setErrorMessage("Error fetching data");
    }
    //   allPosts.sort((a, b) => new Date(b.post_date) - new Date(a.post_date));
  };

  useEffect(() => {
    getAllRecordingsTrigger(username);
  }, [navigate]);

  return (
    <>
      {errorMessage ? (
        <p>{errorMessage}</p>
      ) : (
        <>
          <p>I am reader: {username}</p>
          <CreateRecording username={username} />
          <ViewRecordings data={recordings} />
          <ChildViewButton />
        </>
      )}
    </>
  );
};
