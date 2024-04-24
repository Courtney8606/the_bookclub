import ViewRecordings from "../components/ViewRecordings";
import { getRecordingsByParent } from "../../services/recordings";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const ParentPage = () => {
    const username = localStorage.getItem("username");
    const [recordings, setRecordings] = useState([]);
    const navigate = useNavigate();

    const getAllRecordingsTrigger = (username) => {
        getRecordingsByParent(username)
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
        <p>I am parent: {username}</p>
        <ViewRecordings data = {recordings}/>
        </>
    )
}