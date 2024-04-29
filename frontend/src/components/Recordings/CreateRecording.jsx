import { useState } from 'react';
// import { useNavigate } from "react-router-dom";
import { createRecording } from "../../services/recordings"
import PropTypes from 'prop-types';

const CreateRecording = ({username, connections, onSubmit}) => {
    const [recordingUrl, setRecordingUrl] = useState("")
    const [recordingTitle, setRecordingTitle] = useState("")
    const [parentUsername, setParentUsername] = useState("")
    // const navigate = useNavigate();
    const [error, setError] = useState([])
    const readerUsername = username

    const handleRecordingUrlChange = (event) => {
        setRecordingUrl(event.target.value)
    }; 
    const handleRecordingTitleChange = (event) => {
        setRecordingTitle(event.target.value)
    }; 
    const handleParentUsernameChange = (event) => {
        setParentUsername(event.target.value)
    }; 

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await createRecording(recordingUrl, recordingTitle, parentUsername, readerUsername);
            setRecordingUrl(""); 
            setRecordingTitle("")
            setParentUsername("")
            onSubmit(username)
            // props.onCreateComment();
        } 
        catch (err) {
            console.error(err);
            setError([err.message])
            // navigate("/posts");
        }
    };

    return (
        <div data-testid='create-recording-component'>
        <form onSubmit={handleSubmit}>
        <label>Send your recording:</label><br></br>
        <label htmlFor="recording-url">Recording URL:</label>
            <input data-testid="recording-url" type='text' value={recordingUrl} onChange={handleRecordingUrlChange}></input><br></br>
        <label htmlFor="recording-title">Recording Title:</label>
            <input data-testid="recording-title" type='text' value={recordingTitle} onChange={handleRecordingTitleChange}></input><br></br>
            <label htmlFor="reader-dropdown">Select a reader:</label>
                <select data-testid="reader-dropdown" value={parentUsername} onChange={handleParentUsernameChange}>
                    <option value="">Select a Recipient:</option>
                    {connections.filter((connection) => connection.status === 'approved')
                    .map((connection) => (
                        <option key={connection.id} value={connection.parent_username}>{connection.parent_username}</option>
                    ))}
                    {console.log(connections)}
                </select><br />
            <input className="submit-button" role="submit-button" id="submit" type="submit" value="Submit" />
        </form>
        <div>
            <p>{error}</p>
        </div>
        </div>
    )
}
CreateRecording.propTypes = {
    username: PropTypes.string.isRequired,
    connections: PropTypes.array.isRequired,
    onSubmit: PropTypes.func.isRequired 
};


export default CreateRecording;