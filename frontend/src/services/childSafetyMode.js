const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const childSafetyMode = async () => {
  const requestOptions = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  };

  const response = await fetch(
    `${BACKEND_URL}/child-safety-mode`,
    requestOptions
  );

  return response;
};
