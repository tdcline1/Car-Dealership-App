import React, { useEffect, useState } from "react";
import "../assets/style.css";
import "../assets/bootstrap.min.css";

const BACKEND_URL = "https://car-dealership-app-django.onrender.com";

const Header = () => {
  const [currUser, setCurrUser] = useState(null);

  // Function to check session with Django
  const checkAuth = async () => {
    try {
      const res = await fetch(`${BACKEND_URL}/djangoapp/check-auth`, {
        method: "GET",
        credentials: "include",
      });

      const json = await res.json();
      if (json.isAuthenticated) {
        setCurrUser(json.username); // Update React state
        sessionStorage.setItem("username", json.username);
      } else {
        setCurrUser(null);
        sessionStorage.removeItem("username");
      }
    } catch (error) {
      console.error("Error checking auth:", error);
      setCurrUser(null);
    }
  };

  // Function to handle logout
  const logout = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${BACKEND_URL}/djangoapp/logout`, {
        method: "GET",
        credentials: "include",
      });

      const json = await res.json();
      if (json.success) {
        sessionStorage.removeItem("username");
        setCurrUser(null);
        alert("Logging out...");
        window.location.href = "/";
      } else {
        alert("The user could not be logged out.");
      }
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  // Check session on component mount
  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <nav
      className="navbar navbar-expand-lg navbar-light"
      style={{ backgroundColor: "darkturquoise", height: "1in" }}
    >
      <div className="container-fluid">
        <h2 style={{ paddingRight: "5%" }}>Journey Dealerships</h2>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarText"
          aria-controls="navbarText"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarText">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link active" style={{ fontSize: "larger" }} aria-current="page" href={BACKEND_URL}>
                Home
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" style={{ fontSize: "larger" }} href={`${BACKEND_URL}/about`}>
                About Us
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" style={{ fontSize: "larger" }} href={`${BACKEND_URL}/contact`}>
                Contact Us
              </a>
            </li>
          </ul>
          <span className="navbar-text">
            <div className="loginlink">
              {currUser ? (
                <div className="input_panel">
                  <span className="username">{currUser}</span>
                  <a className="nav_item" href="#" onClick={logout}>
                    Logout
                  </a>
                </div>
              ) : (
                <div className="input_panel">
                  <a className="nav_item" href="/login">
                    Login
                  </a>
                  <a className="nav_item" href="/register">
                    Register
                  </a>
                </div>
              )}
            </div>
          </span>
        </div>
      </div>
    </nav>
  );
};

export default Header;
