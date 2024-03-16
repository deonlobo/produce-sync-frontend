import "./css/LoadingSpinner.css"; // Import the CSS for styling

const LoadingSpinner = () => {
  return (
    <div className="loading-spinner-overlay">
      <div className="loading-spinner"></div>
    </div>
  );
};

export default LoadingSpinner;
