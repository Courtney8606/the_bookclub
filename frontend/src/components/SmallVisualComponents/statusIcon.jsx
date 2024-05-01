import { FaClock, FaCheckCircle, FaCheckDouble, FaTimesCircle} from 'react-icons/fa';
import PropTypes from 'prop-types';

const StatusIcon = ({status}) => {
    // Map status values to corresponding icons
    const statusData = {
        pending: { icon: <FaClock />, text: 'Sent' },
        accepted: { icon: <FaCheckCircle />, text: 'Getting it Ready' },
        completed: { icon: <FaCheckDouble />, text: 'Done' },
        rejected: { icon: <FaTimesCircle />, text: 'Not Accepted' }
      };
    
      // Get the icon and text for the specified status
      const { icon, text } = statusData[status] || {};
    
      // Return the JSX element with the icon and text
      return (
        <div>
          {icon} {/* Render the icon */}
          <span>{text}</span> {/* Render the text */}
        </div>
      );
    };

  StatusIcon.propTypes = {
    status: PropTypes.oneOf(['pending', 'accepted', 'completed', 'rejected']).isRequired
};

export {StatusIcon}