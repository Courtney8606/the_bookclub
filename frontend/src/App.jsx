import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [array, setArray] = useState([]);

  const fetchAPI = async () => {
    const response = await axios.get("http://localhost:5001/api/users");
    setArray(response.data.users);
  };

  useEffect(() => {
    fetchAPI();
  }, []);

  return (
    <>
      {array.map((user, index) => (
        <div key={index}>
          <span>{user}</span>
          <br></br>
        </div>
      ))}
    </>
  );
}

export default App;
