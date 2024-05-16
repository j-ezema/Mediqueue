import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Alert } from "react-bootstrap";
import { meta } from "../../content_option";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import "./style.css"; 

export const RegisterAccount = () => {
  const initialPatientData = {
    firstName: "",
    lastName: "",
    emailAddress: "",
    injuryType: "",
    username: "",
  };

  const [patientData, setPatientData] = useState(initialPatientData);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [password, setPassword] = useState(false);
  const [injuryTypes, setInjuryTypes] = useState([]);
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setPatientData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleCancel = () => {
    event.preventDefault();
    setPatientData(initialPatientData);
  };

  useEffect(() => {
    fetch("http://localhost/hospital-triage-services/api/getInjuryList.php")
      .then((response) => response.json())
      .then((data) => setInjuryTypes(data))
      .catch((error) => console.error("Error fetching injury types:", error));
  }, []);
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(
        "http://localhost/hospital-triage-services/api/addPatient.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(patientData),
        }
      );

      const data = await response.json();
      console.log(data);

      if (!response.ok || data.error) {
        throw new Error(data.error || "Network response was not ok");
      } else {
        console.log("Registration Success:", data);
        setShowConfirmation(true);
        setPassword(data.password);
        setTimeout(() => {
          setShowConfirmation(false);
          navigate("/");
        }, 3000);
        setPatientData(initialPatientData); 
        console.log(data.password);
      }
    } catch (error) {
      console.error("Error submitting registration data:", error);
    }
  };

  return (
    <HelmetProvider>
      <Container>
        <Row className="justify-content-md-center">
          <Helmet>
            <meta charSet="utf-8" />
            <title>Create Account</title>
            <meta name="description" content={meta.description} />
          </Helmet>
          <Row className="mb-5 mt-3 pt-md-3">
            <Col lg="8">
              <h1 className="display-4 mb-4" style={{ fontSize: "35px" }}>
                Create Account
              </h1>
              <hr className="t_border my-4 ml-0 text-left" />
            </Col>
          </Row>
          <Col>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                {showConfirmation && (
                  <Alert variant="success" className="mt-3">
                    Account created successfully! Here is your 3-letter code: {password}
                  </Alert>
                )}
                <Form.Label className="FormText" style={{ fontSize: "15px" }}>
                  First Name
                </Form.Label>
                <Form.Control
                  size="md"
                  type="text"
                  placeholder="Enter patient's first name"
                  name="firstName"
                  value={patientData.firstName}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label className="FormText" style={{ fontSize: "15px" }}>
                  Last Name
                </Form.Label>
                <Form.Control
                  size="md"
                  type="text"
                  placeholder="Enter patient's last name"
                  name="lastName"
                  value={patientData.lastName}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label className="FormText" style={{ fontSize: "15px" }}>
                  Username
                </Form.Label>
                <Form.Control
                  size="md"
                  type="text"
                  placeholder="Enter patient's Username"
                  name="username"
                  value={patientData.username}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label className="FormText" style={{ fontSize: "15px" }}>
                  Email Address
                </Form.Label>
                <Form.Control
                  size="md"
                  type="email"
                  placeholder="Enter patient's email address"
                  name="emailAddress"
                  value={patientData.emailAddress}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label className="FormText" style={{ fontSize: "15px" }}>
                  Injury Type
                </Form.Label>
                <Form.Control
                  as="select"
                  size="md"
                  name="injuryType"
                  value={patientData.injuryType}
                  onChange={handleChange}
                >
                  <option value="">Select Injury Type</option>
                  {injuryTypes.map((injuryType) => (
                    <option key={injuryType.id} value={injuryType.injury_type}>
                      {injuryType.injury_type}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>

              <div className="d-flex justify-content-end">
                <button type="button" className="cancel">
                  <div className="cancelText" onClick={handleCancel}>
                    Cancel
                  </div>
                </button>
                <button type="submit" className="submit">
                  <div className="submitText">Submit</div>
                </button>
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
    </HelmetProvider>
  );
};
