import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import axios from "axios";
import { LoginPage } from "./pages/LoginPage/LoginPage";
import { HomePage } from "./pages/HomePage/HomePage";
import { SignupPage } from "./pages/SignupPage/SignupPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignupPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
