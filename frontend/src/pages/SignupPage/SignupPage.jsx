import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import { signup } from "../../services/authentication";

export const SignupPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await signup(email, password, username);
      console.log("redirecting...:");
      navigate("/login");
    } catch (err) {
      console.error(err);
      navigate("/signup");
    }
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <h2>Book Club</h2>
        <h4>Enter details below to sign up</h4>
      </div>
      <div className="row ">
        <label aria-label="Email:" htmlFor="email">
          Email
        </label>
        <div>
          <input
            type="email"
            id="email"
            placeholder="Enter your email"
            onChange={handleEmailChange}
            value={email}
          ></input>
        </div>
      </div>
      <div>
        <label aria-label="Username:" htmlFor="username">
          Username
        </label>
        <div>
          <input
            type="text"
            id="username"
            placeholder="Enter your username"
            value={username}
            onChange={handleUsernameChange}
          ></input>
        </div>
      </div>
      <div>
        <label aria-label="Password:" htmlFor="password">
          Password
        </label>
        <div>
          <input
            type="password"
            id="password"
            placeholder="Enter your password"
            value={password}
            onChange={handlePasswordChange}
          ></input>
        </div>
      </div>

      <div>
        <button role="submit-button" id="submit" type="submit">
          Create Account
        </button>
      </div>
      <div>
        <hr />
        <p>Already have an account? Click below to log in!</p>
        <Link to="/login">Log in</Link>
      </div>
    </form>
  );
};
