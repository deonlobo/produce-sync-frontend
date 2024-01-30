const BuyerHomePage = () => {
  const handleButtonClick = async () => {
    try {
      // The client-side code cannot directly access the HTTP-only cookie
      // Instead, the server will automatically send the cookie when making requests
      const response = await fetch("http://localhost:8080/buyer/hello", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Include cookies in the request
      });

      if (response.ok) {
        const responseData = await response.text();
        console.log("Response from server:", responseData);
      } else {
        console.log("Failed to fetch data from server");
        // Handle other HTTP response statuses if needed
      }
    } catch (error) {
      console.error("Error during GET request:", error);
    }
  };

  return (
    <div>
      <div>BuyerHomePage</div>
      <button onClick={handleButtonClick}>Print authToken Cookie</button>
    </div>
  );
};

export default BuyerHomePage;
