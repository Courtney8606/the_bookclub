import CreateRecording from "../components/Recordings/CreateRecording";
import ViewRecordings from "../components/Recordings/ViewRecordings";
import ViewConnections from "../components/Connections/ViewConnections";
import ViewRecordingRequests from "../components/RecordingRequests/ViewRecordingRequests";
import { getRecordingsByReader, getRecordingRequestsByReader } from "../services/recordings";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getConnectionsByReader } from "../services/connections";

export const ReaderPage = () => {
    const username = localStorage.getItem("username");
    const [recordings, setRecordings] = useState([]);
    const [connections, setConnections] = useState([]);
    const [recordingRequests, setRecordingRequests] = useState([]);
    const navigate = useNavigate();
    const view = "reader"

    const getAllRecordingsTrigger = (username) => {
        getRecordingsByReader(username)
            .then((data) => {
              const allRecordings = data
            //   allPosts.sort((a, b) => new Date(b.post_date) - new Date(a.post_date));
              setRecordings(allRecordings);
            //   localStorage.setItem("token", data.token);
            })
      } 

      const getAllRecordingRequestsTrigger = (username) => {
        getRecordingRequestsByReader(username)
            .then((data) => {
              const allRecordingRequests = data
            //   allPosts.sort((a, b) => new Date(b.post_date) - new Date(a.post_date));
              setRecordingRequests(allRecordingRequests);
            //   localStorage.setItem("token", data.token);
            })
      } 

      const getAllConnectionsTrigger = (username) => {
        getConnectionsByReader(username)
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
        <h2>Reader View</h2>
        <CreateRecording username = {username} connections={connections} onSubmit={getAllRecordingsTrigger}/>
        <ViewRecordings data = {recordings} view = {view}/>
        <ViewConnections data = {connections} view = {view} onUpdate ={getAllConnectionsTrigger}/>
        <ViewRecordingRequests data = {recordingRequests} view = {view} onUpdate={getAllRecordingRequestsTrigger}/>
        </>
    )
}