import { useState } from 'react';
// import { useNavigate } from "react-router-dom";
import PropTypes from 'prop-types';

const UpdateStatusDropdown = ({options, item_id, updateFunction, onSubmit}) => {
    const username = localStorage.getItem("username");
    const [newStatus, setNewStatus] = useState("")
    // const navigate = useNavigate();
    const [error, setError] = useState([])

    const handleStatusUpdate = (event) => {
        setNewStatus(event.target.value)
    }; 

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await updateFunction(item_id,newStatus) ;
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
                <select data-testid="reader-dropdown" value={newStatus} onChange={handleStatusUpdate}>
                    <option value="">Select a status</option>
                    {options.map((option) => (
                        <option key={option} value={option}>{option}</option>
                    ))}
                </select>
            <input className="submit-button" role="submit-button" id="submit" type="submit" value="Update Status" />
        </form>
        <div>
            <p>{error}</p>
        </div>
        </div>
    )
}
UpdateStatusDropdown.propTypes = {
    item_id: PropTypes.number.isRequired,
    options: PropTypes.array.isRequired,
    updateFunction: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired
};


export default UpdateStatusDropdown;