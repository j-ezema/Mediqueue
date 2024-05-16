import React from "react";
import "./style.css";
import { Helmet, HelmetProvider } from "react-helmet-async";
import Typewriter from "typewriter-effect";
import { introdata, meta } from "../../content_option";
import { Link } from "react-router-dom";
import { SignIn } from "../../components/SignIn";
import { useUser } from "../../context/UserContext";
export const Home = () => {
  const { user } = useUser();

  return (
    <HelmetProvider>
      <section id="home" className="home">
        <Helmet>
          <meta charSet="utf-8" />
          <title> {meta.title}</title>
          <meta name="description" content={meta.description} />
        </Helmet>
        <div className="intro_sec d-block d-lg-flex align-items-center ">
          <div
            className="h_bg-image order-1 order-lg-2 h-100 "
            style={{
              backgroundImage: `url(${introdata.your_img_url})`,
            }}
          ></div>

          <div className="text order-2 order-lg-1 h-100 d-lg-flex justify-content-center">
            <div className="align-self-center ">
              {!user ? (
                <SignIn />
              ) : (
                <div className="intro mx-auto">
                  <h2
                    className="mb-1x"
                    style={{ fontSize: "90px", color: "rgb(103, 212, 205)" }}
                  >
                    {introdata.title}
                  </h2>
                  <h1 className="fluidz-48 mb-1x" style={{ fontSize: "25px" }}>
                    <Typewriter
                      options={{
                        strings: [
                          introdata.animated.first,
                          introdata.animated.second,
                          introdata.animated.third,
                          introdata.animated.fourth,
                        ],
                        autoStart: true,
                        loop: true,
                        deleteSpeed: 10,
                      }}
                    />
                  </h1>
                  <p className="mb-1x">{introdata.description}</p>
                  {user.username === "tcoul050" ? (
                    <div className="intro_btn-action pb-5">
                      <Link to="/PatientBoard" className="text_2">
                        <div id="button_p" className="ac_btn btn ">
                          Patient Board
                          <div className="ring one"></div>
                          <div className="ring two"></div>
                          <div className="ring three"></div>
                        </div>
                      </Link>
                      <Link to="/InjuryList">
                        <div id="button_h" className="ac_btn btn">
                          Injury List
                          <div className="ring one"></div>
                          <div className="ring two"></div>
                          <div className="ring three"></div>
                        </div>
                      </Link>
                    </div>
                  ) : (
                    <div className="intro_btn-action pb-5">
                      <Link to="/UserPage" className="text_2">
                        <div id="button_p" className="ac_btn btn ">
                          Patient Details
                          <div className="ring one"></div>
                          <div className="ring two"></div>
                          <div className="ring three"></div>
                        </div>
                      </Link>
                      <Link to="/contact">
                        <div id="button_h" className="ac_btn btn">
                          Contact Admin
                          <div className="ring one"></div>
                          <div className="ring two"></div>
                          <div className="ring three"></div>
                        </div>
                      </Link>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </HelmetProvider>
  );
};
