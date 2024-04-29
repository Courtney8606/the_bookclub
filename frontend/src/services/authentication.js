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
