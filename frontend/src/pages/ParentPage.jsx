import { getRecordingsByParent, getRecordingRequestsByParent} from "../services/recordings";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getConnectionsByParent } from "../services/connections";
import ViewConnections from "../components/Connections/ViewConnections";
import ViewRecordings from "../components/Recordings/ViewRecordings";
import ViewRecordingRequests from "../components/RecordingRequests/ViewRecordingRequests";
import CreateRecordingRequest from "../components/RecordingRequests/CreateRecordingRequest";
import RequestConnection from "../components/Connections/RequestConnection";

export const ParentPage = () => {
    const username = localStorage.getItem("username");
    const [recordings, setRecordings] = useState([]);
    const [recordingRequests, setRecordingRequests] = useState([]);
    const [connections, setConnections] = useState([]);    
    const navigate = useNavigate();
    const view = "parent"

    const getAllRecordingsTrigger = (username) => {
        getRecordingsByParent(username)
            .then((data) => {
              const allRecordings = data
            allRecordings.sort((a, b) => new Date(b.date_requested) - new Date(a.date_requested));
              setRecordings(allRecordings);
            //   localStorage.setItem("token", data.token);
            })
      } 

      const getAllRecordingRequestsTrigger = (username) => {
        getRecordingRequestsByParent(username)
            .then((data) => {
              const allRecordingRequests = data
            //   allPosts.sort((a, b) => new Date(b.post_date) - new Date(a.post_date));
              setRecordingRequests(allRecordingRequests);
            //   localStorage.setItem("token", data.token);
            })
      } 

      const getAllConnectionsTrigger = (username) => {
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
        getAllRecordingRequestsTrigger(username)
      }, [navigate]); 

    return (
        <>
        <h2>Parent View</h2>
        <ViewRecordings data = {recordings} view = {view}/>
        <RequestConnection username= {username} onSubmit={getAllConnectionsTrigger}/>
        <ViewConnections data = {connections} view = {view}/>
        <CreateRecordingRequest username= {username} connections={connections} onSubmit={getAllRecordingRequestsTrigger}/>
        <ViewRecordingRequests data = {recordingRequests} view = {view}/>
        </>
    )
}