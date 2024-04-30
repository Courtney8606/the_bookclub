import React from 'react';
import { deleteCloudinaryUpload } from '../../services/recordings';
import { deleteRecording } from '../../services/recordings';
import PropTypes from 'prop-types';

export const DeleteAudioButton = (props) => {
    const handleDelete = async() => {
        try {
            await deleteRecording(props.recording_id);
            await deleteCloudinaryUpload(props.public_id);
            console.log('Audio file and associated resources deleted successfully.');
        } catch (error) {
            console.error('Error deleting:', error);
        }
    };

    return (
        <button onClick={handleDelete}>
            Delete
        </button>
    );
};

DeleteAudioButton.propTypes = {
    recording_id: PropTypes.number.isRequired,
    public_id: PropTypes.string.isRequired
};




