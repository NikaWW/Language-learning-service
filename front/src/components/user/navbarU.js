import React, { useState, useEffect } from "react";
import { Button } from "../other/button";
import { Link } from "react-router-dom";
import "../other/navbar.css";

function NavbarU() {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);
  const logoutClick = () => sessionStorage.removeItem("userId");

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  useEffect(() => {
    showButton();
  }, []);

  window.addEventListener("resize", showButton);

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
            Speak
            <i class="fas fa-microphone-alt"></i>
          </Link>
          <div className="menu-icon" onClick={handleClick}>
            <i className={click ? "fas fa-times" : "fas fa-bars"} />
          </div>
          <ul className={click ? "nav-menu active" : "nav-menu"}>
            <li className="nav-item">
              <Link
                to="/teachers"
                className="nav-links"
                onClick={closeMobileMenu}
              >
                Find teacher
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/profile"
                className="nav-links"
                onClick={closeMobileMenu}
              >
                Profile
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to={"/user/lessons/" + sessionStorage.getItem("userId")}
                className="nav-links"
                onClick={closeMobileMenu}
              >
                Lessons
              </Link>
            </li>

            <li>
              <Link
                to="/login"
                className="nav-links-mobile"
                onClick={logoutClick}
              >
                Logout
              </Link>
            </li>
          </ul>
          {button && <Button buttonStyle="btn--outline">Logout</Button>}
        </div>
      </nav>
    </>
  );
}

export default NavbarU;
