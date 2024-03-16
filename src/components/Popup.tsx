import "./css/Popup.css";

interface Props {
  onClose: () => void;
  onSecondaryAction?: () => void;
  message: string;
  type: "success" | "failure";
  primaryButtonName?: string;
  secondaryButtonName?: string;
}

const Popup = ({
  onClose,
  onSecondaryAction,
  message,
  type,
  primaryButtonName = "Close",
  secondaryButtonName,
}: Props) => {
  return (
    <div className={`popup ${type}`}>
      <div className="popup-content">
        <p>{message}</p>
        <button className="btn btn-primary" onClick={onClose}>
          {primaryButtonName}
        </button>
        {secondaryButtonName && onSecondaryAction && (
          <button
            className="btn btn-primary"
            onClick={onSecondaryAction}
            style={{ marginLeft: "1em" }}
          >
            {secondaryButtonName}
          </button>
        )}
      </div>
    </div>
  );
};

export default Popup;
