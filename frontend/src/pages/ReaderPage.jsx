import CreateRecording from "../components/CreateRecording";
import ViewRecordings from "../components/ViewRecordings";
import { getRecordingsByReader } from "../../services/recordings";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const ReaderPage = () => {
    const username = "montoya"
    const [recordings, setRecordings] = useState([]);
    const navigate = useNavigate();

    const getAllRecordingsTrigger = (username) => {
        getRecordingsByReader(username)
            .then((data) => {
              const allRecordings = data
            //   allPosts.sort((a, b) => new Date(b.post_date) - new Date(a.post_date));
              setRecordings(allRecordings);
            //   localStorage.setItem("token", data.token);
            })
      } 

      useEffect(() => {
        getAllRecordingsTrigger(username);
      }, [navigate]); 

    return (
        <>
        <p>I am reader: {username}</p>
        <CreateRecording username = {username}/>
        <ViewRecordings data = {recordings}/>
        </>
    )
}