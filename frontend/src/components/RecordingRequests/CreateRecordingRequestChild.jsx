import { useState } from 'react';
// import { useNavigate } from "react-router-dom";
import { createRecordingRequest } from "../../services/recordings"
import PropTypes from 'prop-types';

const CreateRecordingRequestChild = ({username, connections, onSubmit}) => {
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
        <label><h2>Ask for a new story</h2></label>
        <label htmlFor="recording-description"><h3>What would you like read to you?</h3></label>
        <p><i>You can ask them to make you up a new story or read from a book. If you want a made-up story what are your favourite things to read stories about?</i></p>
            <textarea data-testid="description" type='text' value={requestDescription} onChange={handleRecordingDescriptionChange}/><br></br>
        <label htmlFor="reader-dropdown">Choose your reader: </label>
                <select data-testid="reader-dropdown" value={readerUsername} onChange={handleReaderUsernameChange}>
                    <option value="">click here for your readers </option>
                    {connections.filter((connection) => connection.status === 'approved').map((connection) => (
                        <option key={connection.id} value={connection.reader_username}>{connection.reader_username}</option>
                    ))}
                </select><br />
            <input className="submit-button" role="submit-button" id="submit" type="submit" value="Send" />
        </form>
        <div>
            <p>{error}</p>
        </div>
        </div>
    )
}
CreateRecordingRequestChild.propTypes = {
    username: PropTypes.string.isRequired,
    connections: PropTypes.array.isRequired,
    onSubmit: PropTypes.func.isRequired  
};


export default CreateRecordingRequestChild;