import { createContext, useContext, useState, useEffect } from "react";
import {
  getConnectionsByParent,
  getConnectionsByReader,
} from "../services/connections";
import {
  getRecordingRequestsByParent,
  getRecordingRequestsByReader,
  getRecordingsByParent,
  getRecordingsByReader,
} from "../services/recordings";
import PropTypes from 'prop-types';
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
  const [recordingsReader, setRecordingsReader] = useState([]);
  const [recordingsParent, setRecordingsParent] = useState([]);
  const [loading, setLoading] = useState(true);
  console.log("DATAconnectionsParent", connectionsParent);
  console.log("DATArecordingsRequestParent", recordingRequestsParent);
  console.log("DATAconnectionsReader", connectionsReader);
  console.log("DATArecordingsRequestReader", recordingRequestsReader);
  console.log("DATArecordingsReader", recordingsReader);
  console.log("DATArecordingsParent", recordingsParent);


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

    const fetchReaderRecordings = async () => {
      try {
        const response = await getRecordingsByReader(
          localStorage.getItem("username")
        );
        setRecordingsReader(response);
      } catch (error) {
        console.error("Error fetching recording requests data:", error);
      }
    };

    const fetchParentRecordings = async () => {
      try {
        const response = await getRecordingsByParent(
          localStorage.getItem("username")
        );
        setRecordingsParent(response);
      } catch (error) {
        console.error("Error fetching recording requests data:", error);
      }
    };

    Promise.all([
      fetchParentConnections(),
      fetchParentRecordingRequests(),
      fetchReaderConnections(),
      fetchReaderRecordingRequests(),
      fetchReaderRecordings(),
      fetchParentRecordings(),
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
        recordingsParent,
        recordingsReader
      }}
    >
      {!loading && children}
    </DataContext.Provider>
  );
};
