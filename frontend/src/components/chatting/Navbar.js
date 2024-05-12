import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div className="navbar">
      <Link to="/" className="chatLogo">
        Take Me
        {/* <img className="mx-auto h-10 w-10 rounded-full" src={logo} alt="takeMeLogo" /> */}
      </Link>
      <p className="userName">user</p>
    </div>
  );
}

export default Navbar;
