// docs: https://vitejs.dev/guide/env-and-mode.html
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const login = async (username, password) => {
  const payload = {
    username: username,
    password: password,
  };

  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(payload),
  };

  const response = await fetch(`${BACKEND_URL}/login`, requestOptions);
  
  return response;
};

export const signup = async (email, password, username) => {
  const payload = {
    email: email,
    password: password,
    username: username,
  };

  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(payload),
  };

  let response = await fetch(`${BACKEND_URL}/signup`, requestOptions);
  // docs: https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/201
  if (response.status === 200) {
    return;
  } else {
    throw new Error(
      `Received status ${response.status} when signing up. Expected 200`
    );
  }
};

export const checkUsername = async (username) => {
  const payload = {
    username: username,
  };

  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(payload),
  };

  try {
    let response = await fetch(`${BACKEND_URL}/check-username`, requestOptions);

    if (response.ok) {
      const data = await response.json();
      return data.available; // Return the availability status
    } else {
      console.error('Failed to check username availability:', response.statusText);
      return false; // Return false if there was an error
    }
  } catch (error) {
    console.error('Error checking username availability:', error);
    return false; // Return false if there was an error
  }
}

export const checkEmail = async (email) => {
  const payload = {
    email: email,
  };

  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(payload),
  };

  try {
    let response = await fetch(`${BACKEND_URL}/check-email`, requestOptions);

    if (response.ok) {
      const data = await response.json();
      return data.available; // Return the availability status
    } else {
      console.error('Failed to check email availability:', response.statusText);
      return false; // Return false if there was an error
    }
  } catch (error) {
    console.error('Error checking email availability:', error);
    return false; // Return false if there was an error
  }
}
