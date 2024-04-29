const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const getConnectionsByParent = async (username) => {
    const requestOptions = {
        method: "GET"
    };
    const response = await fetch(`${BACKEND_URL}/connections/parent/${username}`, requestOptions);
    if (response.status !== 200) {
        throw new Error("Unable to fetch posts");
    }
    const data = await response.json();
    return data;
    };

const getConnectionsByReader = async (username) => {
        const requestOptions = {
            method: "GET"
        };
        const response = await fetch(`${BACKEND_URL}/connections/reader/${username}`, requestOptions);
        if (response.status !== 200) {
            throw new Error("Unable to fetch posts");
        }
        const data = await response.json();
        return data;
        };

const createConnectionRequest = async (parent_username, reader_username) => {
            const payload = {
                parent_username: parent_username,
                reader_username: reader_username
            }
        console.log(payload)
        const requestOptions = {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
            };
        let response = await fetch(`${BACKEND_URL}/connections`, requestOptions);
        if (response.status !== 201) {
            throw new Error("Error creating recording");
        }
        const data = await response.json();
        return data;
    }

    const updateConnectionStatus = async (request_id, new_status) => {
        const payload = {
            connection_id: request_id,
            status: new_status
        }
    console.log(payload)
    const requestOptions = {
        method: "PUT",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
        };
        let response = await fetch(`${BACKEND_URL}/connections`, requestOptions);
        if (response.status !== 200) {
            throw new Error("Error creating recording");
        }
    const data = await response.json();
    return data;
    }

export {getConnectionsByParent, getConnectionsByReader, createConnectionRequest, updateConnectionStatus};