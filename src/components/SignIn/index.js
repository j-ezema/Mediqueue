import React, { useState } from "react";
import { Container, Row, Col, Form, Alert } from "react-bootstrap";
import { meta } from "../../content_option";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { useUser } from "../../context/UserContext";
import { Link } from "react-router-dom";
import "./style.css"; // Assuming you've put your custom styles here

export const SignIn = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { signIn } = useUser(); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signIn(username, password);
      // Redirect or update UI upon successful sign-in
    } catch (error) {
      alert(error.message);
    }
  };
  return (
    <HelmetProvider>
      <Container>
        <Row className="justify-content-md-center">
          <Helmet>
            <meta charSet="utf-8" />
            <title>Sign In </title>
            <meta name="description" content={meta.description} />
          </Helmet>
          <Row className="mb-5 mt-3 pt-md-3">
            <Col lg="8">
              <h1 className="display-4 mb-4" style={{ fontSize: "35px" }}>
                Sign In
              </h1>
              <hr className="t_border my-4 ml-0 text-left" />
            </Col>
          </Row>
          <Col>

          <div className="SignInInfo">Please enter your login information or click {" "} <Link to="/RegisterAccount" style={{ textDecoration: 'underline' }}>here</Link> for registration</div>
            <Form onSubmit={handleSubmit}> 
              <Form.Group className="mb-3">
                <Form.Label className="FormText" style={{ fontSize: "20px" }}>
                  Username:
                </Form.Label>
                <Form.Control
                  size="lg"
                  type="text"
                  placeholder="Enter your username"
                  name="firstName"
                  style={{fontFamily: "Marcellus"}}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label className="FormText" style={{ fontSize: "20px" }}>
                  Password:
                </Form.Label>
                <Form.Control
                  size="lg"
                  type="text"
                  placeholder="Enter your 3-letter code"
                  name="password"
                  style={{fontFamily: "Marcellus"}}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>

              <div className="d-flex justify-content-end">
                <button type="submit" className="submit">
                  <div className="submitText">Sign In</div>
                </button>
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
    </HelmetProvider>
  );
};
