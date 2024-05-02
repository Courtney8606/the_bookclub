import ViewConnections from "../../components/Connections/ViewConnections";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getConnectionsByParent } from "../../services/connections";
import { createConnectionRequest } from "../../services/connections";
import RequestConnection from "../../components/Connections/RequestConnection";
import ViewConnectionsCards from "../../components/Connections/ViewConnectionsCards";

export const ParentConnectionsPage = () => {
  const [errorMessage, setErrorMessage] = useState(null);
  const username = localStorage.getItem("username");
  const storedRole = localStorage.getItem("role");
  const [connections, setConnections] = useState([]);
  const navigate = useNavigate();
  const view = "parent";

  useEffect(() => {
    if (storedRole === "parent") {
      if (username) {
        navigate("/familyhubconnections");
        getAllConnectionsTrigger(username);
      } else {
        navigate("/login");
      }
    } else {
      setErrorMessage("Unauthorised");
    }
  }, [username, storedRole, navigate]);

  const getAllConnectionsTrigger = async (username) => {
    await getConnectionsByParent(username).then((data) => {
      const allConnections = data;
      setConnections(allConnections);
    });
  };

  return (
    <>
      {errorMessage ? (
        <p>{errorMessage}</p>
      ) : (
        <>
          <div>
            <RequestConnection
              username={username}
              connections={connections}
              onSubmit={getAllConnectionsTrigger}
            />
            <ViewConnectionsCards
              data={connections}
              view={view}
              onUpdate={getAllConnectionsTrigger}
            />
          </div>
        </>
      )}
    </>
  );
};
