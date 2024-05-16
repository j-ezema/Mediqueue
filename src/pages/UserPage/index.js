import React from "react";
import { useUser } from "../../context/UserContext";
import { Container, Row, Col } from "react-bootstrap";
import { Helmet, HelmetProvider } from "react-helmet-async";
import "./style.css"; // Ensure this CSS file is correctly referenced

export const UserPage = () => {
  const { user } = useUser();

  return (
    <HelmetProvider>
      <Container className="user-page-container">
        <Helmet>
          <meta charSet="utf-8" />
          <title>User Profile</title>
          <meta name="description" content="User profile page" />
        </Helmet>
        <Row className="justify-content-md-center user-profile-row">
          <Col md={8} className="user-profile-col text-center">
            <h1 className="welcome-message">
              Welcome to Mediqueue, {user?.firstName} {user?.lastName}!
            </h1>
            <p className="position-message">
              You are currently position <strong>{user?.position}</strong> on
              the waitlist.
            </p>
            <div className="passcode-container">
              <div className="passcodeHeader">Here is your 3-letter passcode</div>
              <div className="passcode">{user?.password}</div>{" "}
              {/* Ensure passcode is available in user context */}
            </div>
          </Col>
        </Row>
      </Container>
    </HelmetProvider>
  );
};
