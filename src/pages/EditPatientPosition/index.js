import React, { useState } from "react";
import { Container, Row, Col, Form, Alert} from "react-bootstrap";
import { meta } from "../../content_option"; 
import { Helmet, HelmetProvider } from "react-helmet-async";
import "./style.css";

export const EditPatientPosition = () => {
  const [formData, setFormData] = useState({
    username: "",
    newPosition: "",
  });
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleCancel = () => {
    setFormData({ username: "", newPosition: "" });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost/hospital-triage-services/api/updatePatientPosition.php", {
        method: "POST", 
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      setShowConfirmation(true);
      setTimeout(() => setShowConfirmation(false), 3000); // Hide confirmation after 3 seconds
      setFormData({ username: "", newPosition: "" }); // Reset the form fields
    } catch (error) {
      console.error("Error updating patient position:", error);
    }
  };

  return (
    <HelmetProvider>
      <Container>
        <Row className="justify-content-md-center">
          <Helmet>
            <meta charSet="utf-8" />
            <title>Update Patient Position</title>
            <meta name="description" content={meta.description} />
          </Helmet>
          <Col lg={8}>
            <h1 className="display-4 mb-4">Update Patient Position</h1>
            <hr className="t_border my-4 ml-0 text-left" />
            <Form onSubmit={handleSubmit}>
              {showConfirmation && (
                <Alert variant="success" className="mt-3">
                  Patient position updated successfully!
                </Alert>
              )}
              <Form.Group className="mb-3" style={{marginTop: "100px"}}>
                <Form.Label className="FormText">Please enter the patient's username:</Form.Label>
                <Form.Control
                  size="lg"
                  type="text"
                  placeholder="Username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label className="FormText">New Position:</Form.Label>
                <Form.Control
                  size="lg"
                  type="number"
                  placeholder="New Position"
                  name="newPosition"
                  value={formData.newPosition}
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
                  <div className="submitText">Update</div>
                </button>
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
    </HelmetProvider>
  );
};
