import React, { useState, useEffect } from "react";
import "./style.css";
import { useUser } from "../context/UserContext";
import { VscGrabber, VscClose } from "react-icons/vsc";
import { Link, useNavigate } from "react-router-dom";
import Themetoggle from "../components/themetoggle";

const Headermain = () => {
  const [isActive, setActive] = useState("false");
  const handleToggle = () => {
    setActive(!isActive);
    document.body.classList.toggle("ovhidden");
  };
  const { user, signOut } = useUser(); // Destructure signOut from context
  const navigate = useNavigate();

  const handleSignOut = () => {
    setActive(!isActive);
    signOut();
    navigate("/");
  };
  return (
    <>
      <header className="fixed-top site__header">
        <div className="d-flex align-items-center justify-content-between">
          <Link className="navbar-brand nav_ac" to="/">
            {user ? user.username : ""}
          </Link>
          <div className="d-flex align-items-center">
            <Themetoggle />
            <button className="menu__button  nav_ac" onClick={handleToggle}>
              {!isActive ? <VscClose /> : <VscGrabber />}
            </button>
          </div>
        </div>

        <div className={`site__navigation ${!isActive ? "menu__opend" : ""}`}>
          <div className="bg__menu h-100">
            <div className="menu__wrapper">
              <div className="menu__container p-3">
                <ul className="the_menu">
                  <li className="menu_item">
                    <Link onClick={handleToggle} to="/" className="my-3">
                      Home
                    </Link>
                  </li>
                  {!user ? (
                    <li className="menu_item">
                      <Link
                        onClick={handleToggle}
                        to="/contact"
                        className="my-3"
                      >
                        Contact Admin
                      </Link>
                    </li>
                  ) : user.username === "tcoul050" ? (
                    <>
                      <li className="menu_item">
                        <Link
                          onClick={handleToggle}
                          to="/PatientBoard"
                          className="my-3"
                        >
                          Patient Board
                        </Link>
                      </li>
                      <li className="menu_item">
                        <Link
                          onClick={handleToggle}
                          to="/EditPatientBoard"
                          className="my-3"
                        >
                          Edit Patient Board
                        </Link>
                      </li>
                      <li className="menu_item">
                        <Link
                          onClick={handleToggle}
                          to="/InjuryList"
                          className="my-3"
                        >
                          Injury List
                        </Link>
                      </li>
                    </>
                  ) : (
                    <>
                      <li className="menu_item">
                        <Link
                          onClick={handleToggle}
                          to="/UserPage"
                          className="my-3"
                        >
                          Patient Details
                        </Link>
                      </li>
                      <li className="menu_item">
                        <Link
                          onClick={handleToggle}
                          to="/contact"
                          className="my-3"
                        >
                          Contact Admin
                        </Link>
                      </li>
                    </>
                  )}
                  {user && (
                    <li className="menu_item">
                      <Link onClick={handleSignOut} to="/" className="my-3">
                        Sign Out
                      </Link>
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </header>
      <div className="br-top"></div>
      <div className="br-bottom"></div>
      <div className="br-left"></div>
      <div className="br-right"></div>
    </>
  );
};

export default Headermain;
