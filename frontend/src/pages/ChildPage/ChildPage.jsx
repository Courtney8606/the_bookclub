import ViewRecordings from "../../Archive/ViewRecordings";
import { getRecordingsByChild, getRecordingRequestsByParent } from "../../services/recordings";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LogoutButton from "../../components/LogoutButton/LogoutButton";
import { getUserDetails } from "../../services/users";
import { getConnectionsByParent } from "../../services/connections";
import ViewRecordingRequests from "../../components/RecordingRequests/ViewRecordingRequests";
import CreateRecordingRequest from "../../components/RecordingRequests/CreateRecordingRequest";

export const ChildPage = () => {
  const username = localStorage.getItem("username");
  const [recordings, setRecordings] = useState([]);
  const [childName, setChildName] = useState("");
  const [recordingRequests, setRecordingRequests] = useState([]);
  const [connections, setConnections] = useState([]);
  const [errorMessage, setErrorMessage] = useState([])
  const navigate = useNavigate();
  const view = "parent"

  const getAllRecordingsTrigger = (username) => {
    getRecordingsByChild(username).then((data) => {
      const allRecordings = data;
      console.log(data)
      //   allPosts.sort((a, b) => new Date(b.post_date) - new Date(a.post_date));
      setRecordings(allRecordings);
    });
  };

  const getAllRecordingRequestsTrigger = async (username) => {
    try {
      const response = await  getRecordingRequestsByParent(username);
      if (response.message === "Unauthorised") {
        setErrorMessage("Unauthorised");
      } else {
        const allRecordingRequests = response;
        allRecordingRequests.sort((a, b) => new Date(b.date_requested) - new Date(a.date_requested));
        setRecordingRequests(allRecordingRequests);
      }
    } catch (error) {
      console.error("Error fetching data");
      setErrorMessage("Error fetching data");
    }
  }; 

  const getAllConnectionsTrigger = async (username) => {
    await getConnectionsByParent(username).then((data) => {
      const allConnections = data;
      //   allPosts.sort((a, b) => new Date(b.post_date) - new Date(a.post_date));
      setConnections(allConnections);
      //   localStorage.setItem("token", data.token);
    });
  };

  const getLoggedInUserDetails = async () => {
    try {
    const response = await getUserDetails(username);
    if (response.message === "Unauthorised") {
      errorMessage("Unauthorised");
    } else {
        const userDetails = response
        await setChildName(userDetails.child)
        console.log(childName)
    }
    } catch (error) {
    setErrorMessage("Error fetching data");
    console.log(errorMessage)
    }
};  

  useEffect(() => {
    getAllRecordingsTrigger(username);
    getLoggedInUserDetails()    
    getAllConnectionsTrigger(username);
    getAllRecordingRequestsTrigger(username);
  }, [navigate]);

  return (
    <>
      <h2>Hello {childName}!</h2>
      <ViewRecordings data={recordings} />
      <CreateRecordingRequest
            username={username}
            connections={connections}
            onSubmit={getAllRecordingRequestsTrigger}
          />
      <ViewRecordingRequests
            data={recordingRequests}
            view={view}
            onUpdate={getAllRecordingRequestsTrigger}
          />
      <LogoutButton />
    </>
  );
};
