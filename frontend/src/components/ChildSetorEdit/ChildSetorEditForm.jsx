import { useEffect, useState } from 'react';
import { updateChildName } from '../../services/users';
import { useNavigate } from "react-router-dom";
import { getUserDetails } from "../../services/users";


const ChildNameOrEditForm = () => {
    const [newChildName, setNewChildName] = useState("")
    const [error, setError] = useState([])
    const username = localStorage.getItem("username");
    const [showInput, setShowInput] = useState(false);
    const [childName, setChildName] = useState("")
    const navigate = useNavigate();


    const getChildName = async () => {
        try {
            const response = await getUserDetails(username);
            if (response.message === "Unauthorised") {
                // Handle unauthorized case
                return;
            } else {
                const child = response.child
                if (child) {
                setChildName(child);
                setShowInput(child === '');}
                else {
                    setChildName("")
                }
            }
        } catch (error) {
            console.error("Error fetching data");
            setError(["Error fetching data"]);
        }
    };

    const handleSetNewChildName = (event) => {
        setNewChildName(event.target.value)
    }; 

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await updateChildName(newChildName) ;
            await getChildName()
            await setShowInput(false)
        } 
        catch (err) {
            console.error(err);
            setError([err.message])
        }
    };
    
    useEffect(() => {
        getChildName()
    }, [navigate]);

    return (
        <div>
            {(showInput || childName === '') && (
                <>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="name">Enter the name of your child:</label>
                        <input type="text" id="name" value={newChildName} onChange={handleSetNewChildName} />
                        <button type="submit">Submit</button>
                    </form>
                    <div>
                        <p>{error}</p>
                    </div>
                </>
            )}
            {!showInput && childName && (
                <div>
                    <p>Name of Child: {childName} <button onClick={() => setShowInput(true)}>Edit Name</button></p>
                </div>
            )}
        </div>
    );
    };

export default ChildNameOrEditForm;