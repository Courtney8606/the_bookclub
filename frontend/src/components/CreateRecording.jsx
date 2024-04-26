import React, { useState } from 'react';
import { createRecording } from "../../services/recordings";
import { AudioRecorder } from 'react-audio-voice-recorder';

const CreateRecording = (props) => {
    const [recordingTitle, setRecordingTitle] = useState("");
    const [parentUsername, setParentUsername] = useState("");
    const [recordedData, setRecordedData] = useState(null);
    const [error, setError] = useState([]);
    const readerUsername = props.username;

    const handleRecordingData = (data) => {
        console.log(data)
        setRecordedData(data)
    };

    const handleSubmit= async (event) => {
        event.preventDefault();
        try {

            if (!recordedData) {
                throw new Error("Oops! You forgot to record your story, please try again!");
            }
            await createRecording(recordingTitle, parentUsername, readerUsername, recordedData);
            setRecordingTitle("");
            setParentUsername("");
            setRecordedData(null);
        } catch (err) {
            console.error(err);
            setError([err.message]);
        }
    };

    return (

        <div data-testid='create-recording-component'>
              
            <AudioRecorder
                onData={handleRecordingData}
            />
            <form onSubmit={handleSubmit}>
                <label>Send your recording:</label><br />
                <label htmlFor="recording-title">Recording Title:</label>
                <input data-testid="recording-title" type='text' value={recordingTitle} onChange={(e) => setRecordingTitle(e.target.value)} /><br />
                <label htmlFor="recording-parent-username">Parent Username:</label>
                <input data-testid="recording-parent-username" type='text' value={parentUsername} onChange={(e) => setParentUsername(e.target.value)} /><br />
                <input className="submit-button" role="submit-button" id="submit" type="submit" value="Submit" />
            </form>
            <div>
                <p>{error}</p>
            </div>
        </div>
    );
};

export default CreateRecording;








// import { useState } from 'react';
// // import { useNavigate } from "react-router-dom";
// import { createRecording } from "../../services/recordings"
// import { AudioRecorder } from 'react-audio-voice-recorder';

// const CreateRecording = (props) => {
//     const [recordingUrl, setRecordingUrl] = useState("")
//     const [recordingTitle, setRecordingTitle] = useState("")
//     const [parentUsername, setParentUsername] = useState("")
//     // const navigate = useNavigate();
//     const [error, setError] = useState([])
//     const readerUsername = props.username

//     const handleRecordingUrlChange = (event) => {
//         setRecordingUrl(event.target.value)
//     }; 
//     const handleRecordingTitleChange = (event) => {
//         setRecordingTitle(event.target.value)
//     }; 
//     const handleParentUsernameChange = (event) => {
//         setParentUsername(event.target.value)
//     }; 

//     const handleSubmit = async (event) => {
//         event.preventDefault();
//         try {
//             await createRecording(recordingUrl, recordingTitle, parentUsername, readerUsername);
//             setRecordingUrl(""); 
//             setRecordingTitle("")
//             setParentUsername("")
//             // props.onCreateComment();
//         } 
//         catch (err) {
//             console.error(err);
//             setError([err.message])
//             // navigate("/posts");
//         }
//     };

//     return (
//         <div data-testid='create-recording-component'>
//         <form onSubmit={handleSubmit}>
//         <label>Send your recording:</label><br></br>
//         <label htmlFor="recording-url">Recording URL:</label>
//             <input data-testid="recording-url" type='text' value={recordingUrl} onChange={handleRecordingUrlChange}></input><br></br>
//         <label htmlFor="recording-title">Recording Title:</label>
//             <input data-testid="recording-title" type='text' value={recordingTitle} onChange={handleRecordingTitleChange}></input><br></br>
//         <label htmlFor="recording-parent-username">Parent Username:</label>    
//             <input data-testid="recording-parent-username" type='text' value={parentUsername} onChange={handleParentUsernameChange}></input><br></br>
//             <input className="submit-button" role="submit-button" id="submit" type="submit" value="Submit" />
//         </form>
//         <div>
//             <p>{error}</p>
//         </div>
//         </div>
//     )
// }

// export default CreateRecording;