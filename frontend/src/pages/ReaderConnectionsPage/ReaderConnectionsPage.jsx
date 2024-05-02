import ViewConnections from "../../components/Connections/ViewConnections";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getConnectionsByReader } from "../../services/connections";
import ViewConnectionsCards from "../../components/Connections/ViewConnectionsCards";

export const ReaderConnectionsPage = () => {
  const username = localStorage.getItem("username");
  const [connections, setConnections] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const storedRole = localStorage.getItem("role");
  const navigate = useNavigate();
  const view = "reader";

  useEffect(() => {
    if (storedRole === "parent") {
      if (username) {
        navigate("/storystudioconnections");
        getAllConnectionsTrigger(username);
      } else {
        navigate("/login");
      }
    } else {
      setErrorMessage("Unauthorised");
    }
  }, [username, storedRole, navigate]);

  const getAllConnectionsTrigger = (username) => {
    getConnectionsByReader(username).then((data) => {
      console.log(data);
      const allConnections = data;
      console.log(allConnections);
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
