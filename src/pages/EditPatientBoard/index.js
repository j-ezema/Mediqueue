import React from "react";
import "./style.css";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Container, Row, Col } from "react-bootstrap";
import { meta } from "../../content_option";
import { Link } from "react-router-dom";

// Assuming Table is correctly imported from 'beautiful-react-table' or your actual table library

export const EditPatientBoard = () => {
  return (
    <HelmetProvider>
      <Container className="About-header">
        <Helmet>
          <meta charSet="utf-8" />
          <title>Edit Patient Board </title>
          <meta name="description" content={meta.description} />
        </Helmet>
        <Row className="mb-5 mt-3 pt-md-3">
          <Col lg="8">
            <h1 className="display-4 mb-4">Edit Patient Board </h1>
            <hr className="t_border my-4 ml-0 text-left" />
          </Col>
        </Row>
        {/* Use the Table component here with your data and configuration */}
        <Row>
          <Col>
            <Link to="/AddPatient">
              <button className="addPatientContainer">
                <div className="editText">Add Patient</div>
              </button>
            </Link>
          </Col>
          <Col>
            <Link to="/DeletePatient">
              <button className="addPatientContainer">
                <div className="editText">Delete Patient</div>
              </button>
            </Link>
          </Col>
          <Col>
            <Link to="/EditPatientPosition">
              <button className="addPatientContainer">
                <div className="editText">Edit Patient Position</div>
              </button>
            </Link>
          </Col>
        </Row>
      </Container>
    </HelmetProvider>
  );
};
