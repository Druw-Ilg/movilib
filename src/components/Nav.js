import React, { useEffect, useState } from "react";
import logo from "../img/logo.jpg";
import avatar from "../img/avatar.jpg";

const Nav = () => {
  const [show, handleShow] = useState(false);
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        handleShow(true);
      } else {
        handleShow(false);
      }
    });
  }, []);

  return (
    <div className={`nav ${show && "nav-black"}`}>
      <img src={logo} alt="Viral-Movies" className="nav-logo" />
      <img src={avatar} alt="Viral-Movies" className="nav-avatar" />
    </div>
  );
};
export default Nav;
