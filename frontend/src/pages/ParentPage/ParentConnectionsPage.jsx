import ViewConnections from "../../components/Connections/ViewConnections";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getConnectionsByParent } from "../../services/connections";

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
            <ViewConnections
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
