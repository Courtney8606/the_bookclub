import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import axios from "axios";
import { HelmetProvider } from "react-helmet-async";import React from 'react'
import {Cloudinary} from "@cloudinary/url-gen";

import { ReaderPage } from "./pages/ReaderPage/ReaderPage";
import { ParentPage } from "./pages/ParentPage/ParentPage";
import { LoginPage } from "./pages/LoginPage/LoginPage";
import { HomePage } from "./pages/HomePage/HomePage";
import { SignupPage } from "./pages/SignupPage/SignupPage";
import { ChildPage } from "./pages/ChildPage/ChildPage";
import { NavigationBar } from "./components/NavigationBar/NavigationBar";

function App() {

  const cld = new Cloudinary({
    cloud: {
      cloudName: 'dhubt6wjd'
    }
  });


  return (
    <BrowserRouter>
      <HelmetProvider>
        <NavigationBar />
        <Routes>
          <Route path="/reader" element={<ReaderPage />} />
          <Route path="/parent" element={<ParentPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/child" element={<ChildPage />} />
        </Routes>
      </HelmetProvider>
    </BrowserRouter>
  );
}



export default App;
