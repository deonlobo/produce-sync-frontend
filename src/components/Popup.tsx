import "./css/Popup.css";

interface prop {
  onClose: () => void;
  message: string;
  type: "success" | "failure";
}

const Popup = ({ onClose, message, type }: prop) => {
  return (
    <div className={`popup ${type}`}>
      <div className="popup-content">
        <p>{message}</p>
        <button className="btn btn-primary" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default Popup;
