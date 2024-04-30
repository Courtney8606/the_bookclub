const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;


const getRecordingsByParent = async (username) => {
    const requestOptions = {
        method: "GET",
        credentials: "include",
    };
    const response = await fetch(`${BACKEND_URL}/recordings/parent/${username}`, requestOptions);
    if (response.status !== 200) {
        throw new Error("Unable to fetch posts");
    }
    const data = await response.json();
    return data;
    };

const getRecordingsByReader = async (username) => {
        const requestOptions = {
            method: "GET",
            credentials: "include",
        };
        const response = await fetch(`${BACKEND_URL}/recordings/reader/${username}`, requestOptions);
        if (response.status !== 200) {
            throw new Error("Unable to fetch posts");
        }
        const data = await response.json();
        return data;
        };

const getRecordingRequestsByParent = async (username) => {
    const requestOptions = {
        method: "GET",
        credentials: "include",
    };
    const response = await fetch(`${BACKEND_URL}/recording-request/parent/${username}`, requestOptions);
    if (response.status !== 200) {
        throw new Error("Unable to fetch posts");
    }
    const data = await response.json();
    return data;
    };

const getRecordingRequestsByReader = async (username) => {
        const requestOptions = {
            method: "GET",
            credentials: "include"
        };
        const response = await fetch(`${BACKEND_URL}/recording-request/reader/${username}`, requestOptions);
        if (response.status !== 200) {
            throw new Error("Unable to fetch posts");
        }
        const data = await response.json();
        return data;
        };


const createRecording = async (recording_url, recording_title, parent_username, reader_username) => {
        const payload = {
            audio_file: recording_url,
            title: recording_title,
            parent_username: parent_username,
            reader_username: reader_username
        }
    console.log("PAYLOAD: ",payload)
    const requestOptions = {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(payload),
        };
try {
    let response = await fetch(`${BACKEND_URL}/recordings`, requestOptions);

    // Check if the response status is within the success range (200-299)
    if (response.ok) {
        const data = await response.json();
        return data;
    } else {
        // If the response status is not in the success range, throw an error
        const responseData = await response.json(); // Parse response body
        throw new Error(`Error creating recording: ${response.status} - ${responseData.message}`); //here
    }
} catch (error) {
    console.error("Error creating recording:", error);
    throw error; // Rethrow the error to be caught by the caller
}
};


//     let response = await fetch(`${BACKEND_URL}/recordings`, requestOptions); / was at line 72
//     if (response.status !== 201) {
//         throw new Error("Error creating recording");
//     }
//     const data = await response.json();
//     return data;
// }


const cloudinaryUpload = async (formData) => {
    const requestOptions = {
      method: "POST",
      body: formData,
    };
    try {
        const response = await fetch(`${BACKEND_URL}/cloudinary-upload`, requestOptions)
        ;
        if (!response.ok) {
          // If the response status is not in the 200-299 range, throw an error
          throw new Error(`Upload failed with status ${response.status}`);
        }
        // If the response is successful, parse the JSON response
        const data = await response.json();
        console.log("data: ", data)
        // Check if the response data contains the expected properties indicating a successful upload
        if (data.message && data.audio_url) {
            console.log(data)
          // The upload was successful
          return data;
        } else {
          // The response data is missing expected properties
          throw new Error("Unexpected response format from Cloudinary");
        }
      } catch (error) {
        // Handle any errors that occur during the upload process
        console.error("Upload error:", error);
        throw error;
      }
    };

const createRecordingRequest = async (request_description, parent_username, reader_username) => {
    const payload = {
        request_description: request_description,
        parent_username: parent_username,
        reader_username: reader_username
    }
console.log(payload)
const requestOptions = {
    method: "POST",
    headers: {
    "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(payload),
    };
let response = await fetch(`${BACKEND_URL}/recording-request`, requestOptions);
if (response.status !== 201) {
    throw new Error("Error creating recording");
}
const data = await response.json();
return data;
}

const updateRecordingRequestStatus = async (request_id, new_status) => {
    const payload = {
        recording_request_id: request_id,
        reader_status: new_status
    }
console.log(payload)
const requestOptions = {
    method: "PUT",
    headers: {
    "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
    };
    let response = await fetch(`${BACKEND_URL}/recording-request`, requestOptions);
    if (response.status !== 200) {
        throw new Error("Error updating");
    }
const data = await response.json();
return data;
}

const updateRecordingStatus = async (recording_id, new_status) => {
    const payload = {
        recording_id: recording_id,
        recording_status: new_status
    }
    console.log(payload)
    const requestOptions = {
        method: "PUT",
        headers: {
        "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(payload),
        };
        let response = await fetch(`${BACKEND_URL}/recordings/status`, requestOptions);
        if (response.status !== 200) {
            throw new Error("Error updating");
        }
    const data = await response.json();
    return data;
}
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



export {createRecording, getRecordingsByParent, cloudinaryUpload, getRecordingsByChild, getRecordingsByReader, getRecordingRequestsByParent, getRecordingRequestsByReader, createRecordingRequest, updateRecordingRequestStatus, updateRecordingStatus};