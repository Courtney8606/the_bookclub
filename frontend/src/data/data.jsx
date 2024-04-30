import React, { createContext, useContext, useState, useEffect } from "react";
import {
  getConnectionsByParent,
  getConnectionsByReader,
} from "../services/connections";
import {
  getRecordingRequestsByParent,
  getRecordingRequestsByReader,
} from "../services/recordings";

// Create the context
const DataContext = createContext();

// Custom hook to use the context
export const useDataContext = () => useContext(DataContext);

// Context provider component
export const DataProvider = ({ children }) => {
  const [connectionsParent, setConnectionsParent] = useState([]);
  const [recordingRequestsParent, setRecordingRequestsParent] = useState([]);
  const [connectionsReader, setConnectionsReader] = useState([]);
  const [recordingRequestsReader, setRecordingRequestsReader] = useState([]);
  const [loading, setLoading] = useState(true);
  console.log("DATAconnectionsParent", connectionsParent);
  console.log("DATArecordingsParent", recordingRequestsParent);
  console.log("DATAconnectionsReader", connectionsReader);
  console.log("DATArecordingsReader", recordingRequestsReader);

  useEffect(() => {
    const fetchParentConnections = async () => {
      try {
        const response = await getConnectionsByParent(
          localStorage.getItem("username")
        );
        setConnectionsParent(response);
      } catch (error) {
        console.error("Error fetching connections data:", error);
      }
    };

    const fetchParentRecordingRequests = async () => {
      try {
        const response = await getRecordingRequestsByParent(
          localStorage.getItem("username")
        );
        setRecordingRequestsParent(response);
      } catch (error) {
        console.error("Error fetching recording requests data:", error);
      }
    };

    const fetchReaderConnections = async () => {
      try {
        const response = await getConnectionsByReader(
          localStorage.getItem("username")
        );
        setConnectionsReader(response);
      } catch (error) {
        console.error("Error fetching connections data:", error);
      }
    };

    const fetchReaderRecordingRequests = async () => {
      try {
        const response = await getRecordingRequestsByReader(
          localStorage.getItem("username")
        );
        setRecordingRequestsReader(response);
      } catch (error) {
        console.error("Error fetching recording requests data:", error);
      }
    };

    Promise.all([
      fetchParentConnections(),
      fetchParentRecordingRequests(),
      fetchReaderConnections(),
      fetchReaderRecordingRequests(),
    ]).then(() => {
      setLoading(false);
    });
  }, []);

  return (
    <DataContext.Provider
      value={{
        connectionsParent,
        connectionsReader,
        recordingRequestsParent,
        recordingRequestsReader,
      }}
    >
      {!loading && children}
    </DataContext.Provider>
  );
};
