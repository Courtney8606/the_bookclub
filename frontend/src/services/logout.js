const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const logoutservice = async () => {
  const requestOptions = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  };

  const response = await fetch(`${BACKEND_URL}/logout`, requestOptions);

  return response;
};
