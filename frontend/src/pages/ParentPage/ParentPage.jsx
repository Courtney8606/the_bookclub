import { getRecordingRequestsByParent, getRecordingsByParent } from "../../services/recordings";
// import ViewRecordingsArchive from "../../Archive/ViewRecordings";
import ViewConnections from "../../components/Connections/ViewConnections";
import ViewRecordings from "../../components/Recordings/ViewRecordings";
import ViewRecordingRequests from "../../components/RecordingRequests/ViewRecordingRequests";
import CreateRecordingRequest from "../../components/RecordingRequests/CreateRecordingRequest";
import RequestConnection from "../../components/Connections/RequestConnection";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ChildViewButton from "../../components/ChildViewButton/ChildViewButton";
import { getConnectionsByParent } from "../../services/connections";
import ChildNameOrEditForm from "../../components/ChildSetorEdit/ChildSetorEditForm";

export const ParentPage = () => {
  const [errorMessage, setErrorMessage] = useState(null);
  const username = localStorage.getItem("username");
  const [recordings, setRecordings] = useState([]);
  const [recordingRequests, setRecordingRequests] = useState([]);
  const [connections, setConnections] = useState([]);
  const navigate = useNavigate();
  const view = "parent"

  const getAllRecordingsTrigger = async (username) => {
    try {
      const response = await getRecordingsByParent(username);
      if (response.message === "Unauthorised") {
        setErrorMessage("Unauthorised");
      } else {
        const allRecordings = response
        allRecordings.sort((a, b) => new Date(b.date_requested) - new Date(a.date_requested));
        setRecordings(allRecordings);
      }
    } catch (error) {
      console.error("Error fetching data");
      setErrorMessage("Error fetching data");
    }
    //   allPosts.sort((a, b) => new Date(b.post_date) - new Date(a.post_date));
  };


  const getAllRecordingRequestsTrigger = async (username) => {
    getRecordingRequestsByParent(username)
        .then((data) => {
          const allRecordingRequests = data
        //   allPosts.sort((a, b) => new Date(b.post_date) - new Date(a.post_date));
          setRecordingRequests(allRecordingRequests);
        //   localStorage.setItem("token", data.token);
        })
  } 

  const getAllConnectionsTrigger = async (username) => {
    getConnectionsByParent(username)
        .then((data) => {
          const allConnections = data
        //   allPosts.sort((a, b) => new Date(b.post_date) - new Date(a.post_date));
          setConnections(allConnections);
        //   localStorage.setItem("token", data.token);
        })
  } 
  useEffect(() => {
    getAllRecordingsTrigger(username);
    getAllConnectionsTrigger(username);
    getAllRecordingRequestsTrigger(username);
  }, [navigate]);

  return (
    <>
      {errorMessage ? (
        <p>{errorMessage}</p>
      ) : (
        <>
          <p>I am parent: {username} </p>
          <ChildNameOrEditForm/>
          <RequestConnection username= {username} connections= {connections} onSubmit={getAllConnectionsTrigger}/>
          <ViewConnections data = {connections} view = {view} onUpdate={getAllConnectionsTrigger}/>
          <CreateRecordingRequest username= {username} connections={connections} onSubmit={getAllRecordingRequestsTrigger}/>
          <ViewRecordingRequests data = {recordingRequests} view = {view} onUpdate={getAllRecordingRequestsTrigger}/>
          <ViewRecordings data = {recordings} view = {view} />
          <ChildViewButton />
        </>
      )}
    </>
  );
};
