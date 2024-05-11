import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="Home">
      <header className="Home-header">
        <p className="home-title text-7xl pt-5 pb-4 mt-5">Take Me</p>
        <p className="text-sm px-8 pb-7 leading-tight">
          Take me is an application through which users can view and adopt rescued pets online
          directly.
        </p>
        <Link
          to="/login"
          className="bg-white hover:bg-violet-100 text-violet-900 font-semibold py-2 px-8 py-3 mb-4 rounded-full cursor-pointer"
        >
          Login to your account
        </Link>
        <Link
          to="/register"
          className="bg-transparent hover:bg-violet-100 text-violet-900 font-semibold py-2 px-8 py-3 border border-white-600 rounded-full cursor-pointer"
        >
          Register
        </Link>
      </header>
    </div>
  );
}

export default Home;
