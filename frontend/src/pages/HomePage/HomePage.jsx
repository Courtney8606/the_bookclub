import ParentViewButton from "../../components/ParentViewButton/ParentViewButton";
import ReaderViewButton from "../../components/ReaderViewButton/ReaderViewButton";
import ChildViewButton from "../../components/ChildViewButton/ChildViewButton";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const HomePage = () => {
  const username = localStorage.getItem("username");
  const storedRole = localStorage.getItem("role");
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (storedRole === "parent") {
      if (username) {
        navigate("/");
      } else {
        navigate("/login");
      }
    } else {
      setErrorMessage("Unauthorised");
    }
  }, [username, storedRole, navigate]);

  return (
    <>
      {errorMessage ? (
        <p>{errorMessage}</p>
      ) : (
        <>
          <p>Welcome {username}</p>
          <ParentViewButton />
          <ReaderViewButton />
          <ChildViewButton />
        </>
      )}
    </>
  );
};
