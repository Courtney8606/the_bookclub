const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const updateChildName = async (childName) => {
    const payload = {
        child_name: childName
    }
    const requestOptions = {
        method: "PUT",
        headers: {
        "Content-Type": "application/json",
    },
        credentials: "include",
        body: JSON.stringify(payload),
    };

    const response = await fetch(
        `${BACKEND_URL}/users/update-child`,
        requestOptions
    );

    return response;
};

export const getUserDetails = async (username) => {
    const requestOptions = {
        method: "GET",
        headers: {
        "Content-Type": "application/json",
    },
        credentials: "include",
    };

    const response = await fetch(
        `${BACKEND_URL}/users/${username}`,
        requestOptions
    );
    if (response.status !== 200) {
        throw new Error("Unable to fetch user details");
    }
    const data = await response.json();
    return data;
    };