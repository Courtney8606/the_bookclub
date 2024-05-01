const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const updateConnectionsDisplayIcon = async () => {
  const requestOptions = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  };

  const response = await fetch(
    `${BACKEND_URL}/update-connections-notifications`,
    requestOptions
  );

  return response;
};

export const updateRecordingRequestsDisplayIcon = async () => {
  const requestOptions = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  };

  const response = await fetch(
    `${BACKEND_URL}/update-requests-notifications`,
    requestOptions
  );

  return response;
};

export const updateRecordingsDisplayIcon = async () => {
  const requestOptions = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  };

  const response = await fetch(
    `${BACKEND_URL}/update-recordings-notifications`,
    requestOptions
  );

  return response;
};