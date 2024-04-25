import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { LoginPage } from "./pages/LoginPage/LoginPage";
import { HomePage } from "./pages/HomePage/HomePage";
import { SignupPage } from "./pages/SignupPage/SignupPage";
import { NavigationBar } from "./components/NavigationBar/NavigationBar";

function App() {
  return (
    <BrowserRouter>
      <NavigationBar />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignupPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
