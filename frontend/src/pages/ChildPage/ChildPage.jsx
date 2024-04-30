import ViewRecordings from "../../Archive/ViewRecordings";
import { getRecordingsByChild } from "../../services/recordings";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LogoutButton from "../../components/LogoutButton/LogoutButton";
import { getUserDetails } from "../../services/users";

export const ChildPage = () => {
  const username = localStorage.getItem("username");
  const [recordings, setRecordings] = useState([]);
  const [childName, setChildName] = useState("");
  const [errorMessage, setErrorMessage] = useState([])
  const navigate = useNavigate();

  const getAllRecordingsTrigger = (username) => {
    getRecordingsByChild(username).then((data) => {
      const allRecordings = data;
      //   allPosts.sort((a, b) => new Date(b.post_date) - new Date(a.post_date));
      setRecordings(allRecordings);
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
  }, [navigate]);

  return (
    <>
      <h2>Hello {childName}!</h2>
      <ViewRecordings data={recordings} />
      <LogoutButton />
    </>
  );
};
