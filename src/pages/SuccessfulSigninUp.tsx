import React from "react";

const SigninEmailSent = () => {
  return (
    <body className="bg-color" style={{ minHeight: "100vh" }}>
      <div className="container-fluid">
        <div className="row justify-content-center">
          <div className="col-md-6" style={{ marginTop: "4em" }}>
            <div className="card">
              <div className="card-body">
                <h1 className="text-center mb-4">Login Email Sent</h1>
                <p className="text-center">
                  An email has been sent to your address with further
                  instructions.
                </p>
                <p className="text-center">It's simple, it's Passwordless</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </body>
  );
};

export default SigninEmailSent;
