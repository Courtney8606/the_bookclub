import ViewConnections from "../../components/Connections/ViewConnections";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getConnectionsByReader } from "../../services/connections";

export const ReaderConnectionsPage = () => {
  const username = localStorage.getItem("username");
  const [connections, setConnections] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();
  const view = "reader";

  const getAllConnectionsTrigger = (username) => {
    getConnectionsByReader(username).then((data) => {
      console.log(data);
      const allConnections = data;
      console.log(allConnections);
      setConnections(allConnections);
    });
  };
  useEffect(() => {
    if (!username) {
      navigate("/login");}
      
    getAllConnectionsTrigger(username);
  }, [navigate]);

  return (
    <>
      {errorMessage ? (
        <p>{errorMessage}</p>
      ) : (
        <>
          <ViewConnections
            data={connections}
            view={view}
            onUpdate={getAllConnectionsTrigger}
          />
        </>
      )}
    </>
  );
};
