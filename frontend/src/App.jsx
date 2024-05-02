import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { HelmetProvider } from "react-helmet-async";
import React from "react";
import { Cloudinary } from "@cloudinary/url-gen";
import { ReaderPage } from "./pages/ReaderPage/ReaderPage";
import { ParentPage } from "./pages/ParentPage/ParentPage";
import { ParentRequestsPage } from "./pages/ParentPage/ParentRequestsPage";
import { NotificationsPage } from "./pages/NotificationsPage/NotificationsPage";
import { LoginPage } from "./pages/LoginPage/LoginPage";
import { HomePage } from "./pages/HomePage/HomePage";
import { SignupPage } from "./pages/SignupPage/SignupPage";
import { ChildPage } from "./pages/ChildPage/ChildPage";
import { ReaderLandingPage } from "./pages/ReaderLandingPage/ReaderLandingPage";
import { NavigationBar } from "./components/NavigationBar/NavigationBar";
import { DataProvider } from "./data/data";
import { Footer } from "./components/Footer/Footer";
import { ReaderConnectionsPage } from "./pages/ReaderConnectionsPage/ReaderConnectionsPage";
import { ReaderStoriesPage } from "./pages/ReaderStoriesPage/ReaderStoriesPage";
import { CreateRecordingPage } from "./pages/CreateRecordingPage/CreateRecordingPage";
import { ParentLandingPage } from "./pages/ParentPage/ParentLandingPage";
import { ParentStoriesPage } from "./pages/ParentPage/ParentStoriesPage";
import { ParentConnectionsPage } from "./pages/ParentPage/ParentConnectionsPage";
import { ReaderStoryRequestsPage } from "./pages/ReaderStoryRequestsPage/ReaderStoryRequestsPage";
import { ChildStoriesPage } from "./pages/ChildPage/ChildStoriesPage";
import { ChildStoryRequestsPage } from "./pages/ChildPage/ChildStoryRequestsPage";
import { ChildLandingPage } from "./pages/ChildPage/ChildLandingPage";

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
            {/* <Route path="/reader" element={<ReaderPage />} /> */}
            <Route path="/parent" element={<ParentPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/" element={<HomePage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/child" element={<ChildLandingPage />} />
            <Route path="/childstories" element={<ChildStoriesPage />} />
            <Route
              path="/childstoryrequests"
              element={<ChildStoryRequestsPage />}
            />
            <Route path="/notifications" element={<NotificationsPage />} />
            <Route path="/storystudio" element={<ReaderLandingPage />} />
            <Route path="/familyhubrequests" element={<ParentRequestsPage />} />
            <Route
              path="/storystudioconnections"
              element={<ReaderConnectionsPage />}
            />
            <Route
              path="/storystudiorequests"
              element={<ReaderStoryRequestsPage />}
            />
            <Route path="/storystudiostories" element={<ReaderStoriesPage />} />
            <Route
              path="/storystudiorecording"
              element={<CreateRecordingPage />}
            />
            <Route path="/familyhub" element={<ParentLandingPage />} />
            <Route
              path="/familyhubconnections"
              element={<ParentConnectionsPage />}
            />
            <Route path="/familyhubstories" element={<ParentStoriesPage />} />
          </Routes>
          <Footer />
        </DataProvider>
      </HelmetProvider>
    </BrowserRouter>
  );
}

export default App;
