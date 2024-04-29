import { useState } from 'react';
// import { useNavigate } from "react-router-dom"; 
import PropTypes from 'prop-types';
import { createConnectionRequest } from '../../services/connections';

const RequestConnection = ({username, onSubmit}) => {
    const [readerUsername, setReaderUsername] = useState("")
    // const navigate = useNavigate();
    const [error, setError] = useState([])
    const parentUsername = username

    const handlerReaderUsernameChange = (event) => {
        setReaderUsername(event.target.value)
    }; 

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await createConnectionRequest(parentUsername, readerUsername);
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
        <label>Connection Request:</label><br></br>
        <label htmlFor="reader-username">Request Reader Connection (please input their username):</label>
            <input data-testid="reader-username" type='text' value={readerUsername} onChange={handlerReaderUsernameChange}></input><br></br>
            <input className="submit-button" role="submit-button" id="submit" type="submit" value="Submit" />
        </form>
        <div>
            <p>{error}</p>
        </div>
        </div>
    )
}
RequestConnection.propTypes = {
    username: PropTypes.string.isRequired,
    connections: PropTypes.array.isRequired,
    onSubmit: PropTypes.func.isRequired
};


export default RequestConnection;