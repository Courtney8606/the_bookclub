const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;


const getRecordingsByParent = async (username) => {
    const requestOptions = {
        method: "GET"
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
            method: "GET"
        };
        const response = await fetch(`${BACKEND_URL}/recordings/reader/${username}`, requestOptions);
        if (response.status !== 200) {
            throw new Error("Unable to fetch posts");
        }
        const data = await response.json();
        return data;
        };

const createRecording = async (recordedUrl, recording_title, parent_username, reader_username) => {
        const payload = {
            audio_file: recordedUrl,
            title: recording_title,
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
    let response = await fetch(`${BACKEND_URL}/recordings`, requestOptions);
    if (response.status !== 201) {
        throw new Error("Error creating recording");
    }
    const data = await response.json();
    return data;
}

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




export {createRecording, getRecordingsByParent, getRecordingsByReader, cloudinaryUpload};