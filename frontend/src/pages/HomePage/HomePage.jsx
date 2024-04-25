import ParentViewButton from "../../components/ParentViewButton/ParentViewButton";
import ReaderViewButton from "../../components/ReaderViewButton/ReaderViewButton";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const HomePage = () => {
  const username = localStorage.getItem("username");
  const navigate = useNavigate();

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      navigate("/");
    } else {
      navigate("/login");
    }
  }, []);

  return (
    <>
      <p>Welcome {username}</p>
      <ParentViewButton />
      <ReaderViewButton />
    </>
  );
};
