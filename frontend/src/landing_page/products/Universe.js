import React from "react";
import { Link } from 'react-router-dom';

function Universe() {
  return (
    <div className="container mt-5">
      <div className="row text-center">
        <h1 className="fs-3">The Astra Trade Universe</h1>
        <p>
          Extend your trading and investment experience even further with our
          partner platforms
        </p>

        <div className="col-4 p-3 mt-5">
          <img src="media/images/smallcaseLogo.png" alt="smallcaseLogo"/>
          <p className="text-small text-muted">Thematic investment platform</p>
        </div>
        <div className="col-4 p-3 mt-5">
          <img
            src="media/images/streakLogo.png"
            alt="Streak Logo"
            style={{ width: "100%", maxWidth: "200px", height: "auto" }}
          />
          <p className="text-small text-muted">Thematic investment platform</p>
        </div>
        <div className="col-4 p-3 mt-5">
          <img
            src="media/images/sensibullLogo.svg"
            alt="sensibull Logo"
            style={{ width: "100%", maxWidth: "200px", height: "auto" }}
          />
          <p className="text-small text-muted">Thematic investment platform</p>
        </div>
        <div className="col-4 p-3 mt-5">
          <img
            src="media/images/zerodhaFundhouse.png"
            alt="zerodha Fundhouse"
            style={{ width: "100%", maxWidth: "200px", height: "auto" }}
          />
          <p className="text-small text-muted">Thematic investment platform</p>
        </div>
        <div className="col-4 p-3 mt-5">
          <img
            src="media/images/goldenpiLogo.png"
            alt="goldenpi Logo"
            style={{ width: "100%", maxWidth: "200px", height: "auto" }}
          />
          <p className="text-small text-muted">Thematic investment platform</p>
        </div>
        <div className="col-4 p-3 mt-5">
          <img
            src="media/images/dittoLogo.png"
            alt="ditto Logo"
            style={{ width: "100%", maxWidth: "200px", height: "auto" }}
          />
          <p className="text-small text-muted">Thematic investment platform</p>
        </div>
        <Link to="/signup" style={{ textDecoration: "none" }}>
        <button
          className="p-2 btn btn-primary fs-5 mb-5"
          style={{ width: "20%", margin: "0 auto" }}
        >
          Signup Now
        </button>
        </Link>
      </div>
    </div>
  );
}

export default Universe;
