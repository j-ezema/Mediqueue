import React, { useState } from "react";
import { Container, Row, Col, Form, Alert, Button } from "react-bootstrap";
import { meta } from "../../content_option";
import { Helmet, HelmetProvider } from "react-helmet-async";
import "./style.css"; // Make sure your CSS styles are correctly imported

export const DeletePatient = () => {
  const [username, setUsername] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleChange = (event) => {
    setUsername(event.target.value);
  };

  const handleCancel = () => {
    setUsername("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(
        "http://localhost/hospital-triage-services/api/deletePatient.php", // Adjust this endpoint as needed
        {
          method: "DELETE", // Use the DELETE method if your API supports it
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username }), // Adjust the body as required by your API
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      setShowConfirmation(true);
      setTimeout(() => setShowConfirmation(false), 3000); // Hide confirmation after 3 seconds
      setUsername(""); // Reset the username field
    } catch (error) {
      console.error("Error deleting patient:", error);
    }
  };

  return (
    <HelmetProvider>
      <Container>
        <Row className="justify-content-md-center">
          <Helmet>
            <meta charSet="utf-8" />
            <title>Delete Patient</title>
            <meta name="description" content={meta.description} />
          </Helmet>
          <Col lg={8}>
            <h1 className="display-4 mb-4">Delete Patient</h1>
            <hr className="t_border my-4 ml-0 text-left" />
            <Form onSubmit={handleSubmit}>
              {showConfirmation && (
                <Alert variant="success" className="mt-3">
                  Patient deleted successfully!
                </Alert>
              )}
              <Form.Group className="mb-3" style={{marginTop: "150px"}}>
                <Form.Label className="FormText">Please enter the patient's username:</Form.Label>
                <Form.Control
                  size="lg"
                  type="text"
                  placeholder="Username"
                  name="username"
                  value={username}
                  onChange={handleChange}
                />
              </Form.Group>

              <div className="d-flex justify-content-end">
                <button type="button" className="cancel">
                  <div className="cancelText" onClick={handleCancel}>
                    Cancel
                  </div>
                </button>
                <button type="submit" className="submit">
                  <div className="submitText">Delete</div>
                </button>
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
    </HelmetProvider>
  );
};
