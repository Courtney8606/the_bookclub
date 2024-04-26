import { useState } from 'react';
// import { useNavigate } from "react-router-dom";
import { createRecordingRequest } from "../../services/recordings"
import PropTypes from 'prop-types';

const CreateRecordingRequest = ({username, connections, onSubmit}) => {
    const [requestDescription, setRequestDescription] = useState("")
    const [readerUsername, setReaderUsername] = useState("")
    // const navigate = useNavigate();
    const [error, setError] = useState([])
    const parentUsername = username

    const handleRecordingDescriptionChange = (event) => {
        setRequestDescription(event.target.value)
    }; 
    const handleReaderUsernameChange = (event) => {
        setReaderUsername(event.target.value)
    }; 

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await createRecordingRequest(requestDescription,parentUsername,readerUsername) ;
            setRequestDescription(""); 
            setReaderUsername("")
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
        <label>Request a recording:</label><br></br>
        <label htmlFor="recording-description">Request Description:</label>
            <input data-testid="description" type='text' value={requestDescription} onChange={handleRecordingDescriptionChange}></input><br></br>
        <label htmlFor="reader-dropdown">Select a reader:</label>
                <select data-testid="reader-dropdown" value={readerUsername} onChange={handleReaderUsernameChange}>
                    <option value="">Select a reader</option>
                    {connections.filter((connection) => connection.status === 'approved').map((connection) => (
                        <option key={connection.id} value={connection.reader_username}>{connection.reader_username}</option>
                    ))}
                </select><br />
            <input className="submit-button" role="submit-button" id="submit" type="submit" value="Submit" />
        </form>
        <div>
            <p>{error}</p>
        </div>
        </div>
    )
}
CreateRecordingRequest.propTypes = {
    username: PropTypes.string.isRequired,
    connections: PropTypes.array.isRequired,
    onSubmit: PropTypes.func.isRequired  
};


export default CreateRecordingRequest;