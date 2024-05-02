const ChildSendButton = ({ className }) => {
  return (
    <div className="child-stories-view">
      <button
        className="submit-button"
        role="submit-button"
        id="submit"
        type="submit"
        style={{
          backgroundColor: "white",
          border: "2px solid #e72ba5",
          color: "#e72ba5",
          height: "70px",
          width: "200px",
          fontSize: "20px",
        }}
      >
        Send
      </button>
    </div>
  );
};

export default ChildSendButton;
