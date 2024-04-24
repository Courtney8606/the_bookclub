import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import axios from "axios";
import { ReaderPage } from "./pages/ReaderPage";
import { ParentPage } from "./pages/ParentPage";

function App() {
  const [array, setArray] = useState([]);
  const [test, setTest] = useState([]);

  const fetchAPI = async () => {
    const response = await axios.get("http://localhost:5001/api/users");
    setArray(response.data.users);
  };

  const fetchTest = async () => {
    const response = await axios.get("http://localhost:5001/test");
    setTest(response.data);
  };

  useEffect(() => {
    fetchAPI();
    fetchTest();
  }, []);

  return (
    <BrowserRouter>
      <Routes>{/* <Route path="/" element={<HomePage/>}/> */}</Routes>
      <>
        {array.map((user, index) => (
          <div key={index}>
            <span>{user}</span>
            <br></br>
          </div>
        ))}
        {test.map((item) => (
          <div key={item.id}>
            <span>{item.title}</span>
            <br></br>
          </div>
        ))}
      </>
      <Routes>
        <Route path="/reader" element={<ReaderPage/>} />
        <Route path="/parent" element={<ParentPage/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
