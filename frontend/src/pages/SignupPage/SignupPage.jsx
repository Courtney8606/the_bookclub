import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./SignupPage.css";
import { signup, checkUsername, checkEmail } from "../../services/authentication";

export const SignupPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [usernameAvailable, setUsernameAvailable] = useState(true);
  const [emailAvailable, setEmailAvailable] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const special = /[!@#$%^&*(),.?":{}|<>]/;
  const caps = /[A-Z]/
  
  
const handleSubmit = async (event) => {
    event.preventDefault();

    if (password.length > 12 && special.test(password) && caps.test(password)) {
      try {
        // Check if the username is available
        const usernameAvailable = await checkUsername(username);
        const emailAvailable = await checkEmail(email);
        setUsernameAvailable(usernameAvailable);
        setEmailAvailable(emailAvailable);

      if (usernameAvailable && emailAvailable) {
          // If username is available, proceed with signup
          await signup(email, password, username);
          console.log("redirecting...");
          navigate("/login");
        } else {
          if (!usernameAvailable && !emailAvailable) {
            setErrorMessage('Username and email are already taken!');
          } else if (!usernameAvailable) {
            setErrorMessage('Username is already taken!');
          } else {
            setErrorMessage('Email is already taken!');
          }
        }
      } catch (error) {
        console.error('Error during signup:', error);
        setErrorMessage('Error during signup. Please try again.');
      }
    } else {
      // Display error message if password is invalid
      setErrorMessage('invalid details');
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
