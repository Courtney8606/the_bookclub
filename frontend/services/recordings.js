const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const getRecordingsByParent = async (username) => {
  const requestOptions = {
    method: "GET",
    credentials: "include",
  };
  const response = await fetch(
    `${BACKEND_URL}/recordings/parent/${username}`,
    requestOptions
  );
  if (response.status === 401) {
    throw new Error("Unauthorised access");
  }

  if (!response.ok) {
    throw new Error("Unable to fetch recordings");
  }

  const data = await response.json();
  return data;
};

const getRecordingsByReader = async (username) => {
  const requestOptions = {
    method: "GET",
    credentials: "include",
  };
  const response = await fetch(
    `${BACKEND_URL}/recordings/reader/${username}`,
    requestOptions
  );
  if (response.status === 401) {
    throw new Error("Unauthorised access");
  }

  if (!response.ok) {
    throw new Error("Unable to fetch recordings");
  }

  const data = await response.json();
  return data;
};

const getRecordingsByChild = async () => {
  const requestOptions = {
    method: "GET",
    credentials: "include",
  };
  const response = await fetch(
    `${BACKEND_URL}/recordings/child`,
    requestOptions
  );
  if (response.status === 401) {
    throw new Error("Unauthorised access");
  }

  if (!response.ok) {
    throw new Error("Unable to fetch recordings");
  }

  const data = await response.json();
  return data;
};

const createRecording = async (
  recording_url,
  recording_title,
  parent_username,
  reader_username
) => {
  const payload = {
    audio_file: recording_url,
    title: recording_title,
    parent_username: parent_username,
    reader_username: reader_username,
  };
  console.log(payload);
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(payload),
  };
  let response = await fetch(`${BACKEND_URL}/recordings`, requestOptions);
  if (response.status !== 201) {
    throw new Error("Error creating recording");
  }
  const data = await response.json();
  return data;
};

export {
  createRecording,
  getRecordingsByParent,
  getRecordingsByReader,
  getRecordingsByChild,
};
