import ViewRecordings from "../../components/ViewRecordings";
import { getRecordingsByChild } from "../../services/recordings";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LogoutButton from "../../components/LogoutButton/LogoutButton";

export const ChildPage = () => {
  const username = localStorage.getItem("username");
  const [recordings, setRecordings] = useState([]);
  const navigate = useNavigate();

  const getAllRecordingsTrigger = (username) => {
    getRecordingsByChild(username).then((data) => {
      const allRecordings = data;
      //   allPosts.sort((a, b) => new Date(b.post_date) - new Date(a.post_date));
      setRecordings(allRecordings);
    });
  };

  useEffect(() => {
    getAllRecordingsTrigger(username);
  }, [navigate]);

  return (
    <>
      <p>I am child: Tbd</p>
      <ViewRecordings data={recordings} />
      <LogoutButton />
    </>
  );
};
