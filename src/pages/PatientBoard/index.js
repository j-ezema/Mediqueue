import React from "react";
import "./style.css";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Container, Row, Col } from "react-bootstrap";
import {meta } from "../../content_option";
// Assuming Table is correctly imported from 'beautiful-react-table' or your actual table library

import PatientTable from "../../components/PatientTable";

export const PatientBoard = () => {

  return (
    <HelmetProvider>
      <Container className="About-header">
        <Helmet>
          <meta charSet="utf-8" />
          <title> Patient Board </title>
          <meta name="description" content={meta.description} />
        </Helmet>
        <Row className="mb-5 mt-3 pt-md-3">
          <Col lg="8">
            <h1 className="display-4 mb-4"> Patient Board </h1>
            <hr className="t_border my-4 ml-0 text-left" />
          </Col>
        </Row>
        {/* Use the Table component here with your data and configuration */}
        <PatientTable />
      </Container>
    </HelmetProvider>
  );
};
