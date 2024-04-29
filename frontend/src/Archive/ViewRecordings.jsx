import PropTypes from "prop-types";

// import { useNavigate } from "react-router-dom";

const ViewRecordings = ({ data }) => {

  if (data.message === "Unauthorised") {
    return <p>Unauthorised access</p>;
  }
    if (!data || data.length === 0) {
        return <p>No data available</p>;
    }
    
    const columns = Object.keys(data[0]);
    
    return (
        <table>
          <thead>
            <tr>
              {columns.map((column, index) => (
                <th key={index}>{column}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <td>{item.title}</td>
                <td>{item.reader_id}</td>
                {/* {columns.map((column, columnIndex) => (
                  <td key={columnIndex}>{item[column]}</td>
                ))} */}
                <td>
                  <audio controls>
                    <source src={item.audio_file} type="audio/mpeg" />
                    Your browser does not support the audio element
                  </audio>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      );
    };

ViewRecordings.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
};


export default ViewRecordings;