import ParentViewButton from "../../components/ParentViewButton/ParentViewButton";
import ReaderViewButton from "../../components/ReaderViewButton/ReaderViewButton";

export const HomePage = () => {
  const username = localStorage.getItem("username");

  return (
    <>
      <p>Welcome {username}</p>
      <ParentViewButton />
      <ReaderViewButton />
    </>
  );
};
