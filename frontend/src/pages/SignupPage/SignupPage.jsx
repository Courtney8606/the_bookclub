import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./SignupPage.css";
import { signup } from "../../services/authentication";

export const SignupPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const special = /[!@#$%^&*(),.?":{}|<>]/;
  const caps = /[A-Z]/
  
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password.length > 8 && special.test(password) && caps.test(password)) {
      try {
        await signup(email, password, username);
        console.log("redirecting...:");
        navigate("/login");
      } catch (err) {
        console.error(err);
        navigate("/signup");
      }
    }
    else {
      setErrorMessage('invalid Password!')
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
    <div className="signup-container">
      <form className="signup-form" onSubmit={handleSubmit}>
        <div>
          <h2>Book Club</h2>
          <h4>Enter details below to sign up</h4>
        </div>
        <div>
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
              className="signup-input"
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
              className="signup-input"
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
              className="signup-input"
            ></input>
          </div>
         
          <ul style={{ listStyleType: 'disc', marginLeft: '10px', paddingTop: '0', marginBottom: '0' }}>
        <ul style={{ listStyleType: 'disc', marginLeft: '10px', paddingTop: '0', marginBottom: '0' }}>
        <h3 style={{fontSize: '12px', color: password.length > 12 && special.test(password) && caps.test(password) ? 'green' : 'red', textAlign: 'left'}}>Password requirements:</h3>
        <li style={{ fontSize: '12px', color: password.length > 12 ? 'green' : 'red', textAlign: 'left' }}>Password length must be greater than 12.</li>
        <li style={{ fontSize: '12px', color: special.test(password) ? 'green' : 'red', textAlign: 'left' }}>Must contain special character.</li>
        <li style={{ fontSize: '12px', color: caps.test(password) ? 'green' : 'red', textAlign: 'left' }}>Must contain at least one capital letter character.</li>
      </ul>
      </ul>
         
        </div>

        <div>
          <button
            role="submit-button"
            id="submit"
            type="submit"
            className="signup-button"
          >
            Create Account
          </button>
        </div>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <div>
          <hr />
          <p>Already have an account? Click below to log in!</p>
          <Link to="/login">Log in</Link>
        </div>
      </form>
      <div className="background-container"></div>
    </div>
  );
};
