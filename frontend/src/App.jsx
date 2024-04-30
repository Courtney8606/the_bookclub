import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { HelmetProvider } from "react-helmet-async";
import React from "react";
import { Cloudinary } from "@cloudinary/url-gen";
import { ReaderPage } from "./pages/ReaderPage/ReaderPage";
import { ParentPage } from "./pages/ParentPage/ParentPage";
import { NotificationsPage } from "./pages/NotificationsPage/NotificationsPage";
import { LoginPage } from "./pages/LoginPage/LoginPage";
import { HomePage } from "./pages/HomePage/HomePage";
import { SignupPage } from "./pages/SignupPage/SignupPage";
import { ChildPage } from "./pages/ChildPage/ChildPage";
import { NavigationBar } from "./components/NavigationBar/NavigationBar";
import { DataProvider } from "./data/data";

function App() {
  const cld = new Cloudinary({
    cloud: {
      cloudName: "dhubt6wjd",
    },
  });

  return (
    <BrowserRouter>
      <HelmetProvider>
        <DataProvider>
          <NavigationBar />
          <Routes>
            <Route path="/reader" element={<ReaderPage />} />
            <Route path="/parent" element={<ParentPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/" element={<HomePage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/child" element={<ChildPage />} />
            <Route path="/notifications" element={<NotificationsPage />} />
          </Routes>
        </DataProvider>
      </HelmetProvider>
    </BrowserRouter>
  );
}

export default App;
