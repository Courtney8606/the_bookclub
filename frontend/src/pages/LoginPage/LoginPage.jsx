import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./LoginPage.css";
import { login } from "../../services/authentication";

export const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  //   const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  //   const handleErrorResponse = async (response) => {
  //     try {
  //       let data = await response.json();
  //       if (data.message === "Password incorrect") {
  //         setErrorMessage("Password is incorrect. Please try again.");
  //         document.getElementById("password").value = "";
  //       } else {
  //         setErrorMessage("An error has occurred. Please try again.");
  //       }
  //     } catch (err) {
  //       console.error(err);
  //       setErrorMessage(
  //         "Email address not found. Please try a different email address or sign up."
  //       );
  //     }
  //   };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await login(username, password);
      if (response.status != 200) {
        console.log("Error returning data");
      } else {
        const data = await response.json();
        localStorage.setItem("username", data["username"]);
        navigate("/");
      }
    } catch (err) {
      console.error("Error", err);
      navigate("/login");
    }
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  return (
    <>
      <div className="login-container">
        <form className="login-form" onSubmit={handleSubmit}>
          <div>
            <h2>Book Club</h2>
            <h4>Enter details below to login</h4>
          </div>
          <label htmlFor="username">Username:</label>
          <input
            id="username"
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={handleUsernameChange}
            className="login-input"
          />
          <br></br>
          <label htmlFor="password">Password:</label>
          <input
            id="password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={handlePasswordChange}
            className="login-input"
          />
          <br></br>
          <input
            className="login-button"
            role="submit-button"
            id="submit"
            type="submit"
            value="Submit"
          />
          {/* {errorMessage && <p className="error-message">{errorMessage}</p>} */}
          <div>
            <hr />
            <p>Don't have an account? Click below to sign up!</p>
            <Link to="/signup">Sign up</Link>
          </div>
        </form>
        <div className="background-container"></div>
      </div>
    </>
  );
};
