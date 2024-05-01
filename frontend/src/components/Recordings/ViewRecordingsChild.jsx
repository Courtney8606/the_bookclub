
import PropTypes from 'prop-types';


const ViewRecordingsChild = ({data}) => {
  console.log("ITEM", data[0])
  if (data.message === "Unauthorised") {
    return <p>Unauthorised access</p>;
  }
    if (!data || data.length === 0) {
        return <p>No data available</p>;
    }

    return (
      <>
        <h2>Listen to Your Stories</h2>
        <table>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <td><h3>{item.title}</h3></td>
                <td>
                  <audio controls>
                    <source src={item.audio_file} type="audio/mpeg" />
                    Your browser does not support the audio element
                  </audio>
                </td>
                <td>Read for you by: {item.reader_username}</td>
              </tr>
            ))}
          </tbody>
        </table>
        </>
      );
    };

    ViewRecordingsChild.propTypes = {
      data: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
  };
  
export default ViewRecordingsChild;