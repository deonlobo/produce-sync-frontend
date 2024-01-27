import { Link } from "react-router-dom";

interface prop {
  image: string;
}

const SigninCard = ({ image }: prop) => {
  return (
    <>
      <div className="card mb-3" style={{ maxWidth: "60%" }}>
        <div className="row g-0">
          <div className="col-md-4">
            <img
              src={image}
              className="img-fluid w-100 rounded-start"
              alt="..."
            />
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h5 className="card-title">Signin</h5>
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Username"
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                />
              </div>
              <div className="input-group mb-3">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Password"
                  aria-label="Password"
                  aria-describedby="basic-addon1"
                />
              </div>
              <button type="button" className="btn btn-primary">
                Signin
              </button>
              <p className="card-text" style={{ marginTop: "1em" }}>
                <small className="text-body-secondary">
                  Dont have an account, you can <Link to="">signup here</Link>
                </small>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SigninCard;
