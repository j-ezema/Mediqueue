import React from "react";
import "./style.css";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Container, Row, Col } from "react-bootstrap";
import InjuryListTable from "../../components/InjuryListTable";
import { meta } from "../../content_option";

export const InjuryList = () => {
  return (
    <HelmetProvider>
      <Container className="About-header">
        <Helmet>
          <meta charSet="utf-8" />
          <title> About me | {meta.title}</title>
          <meta name="description" content={meta.description} />
        </Helmet>
        <Row className="mb-5 mt-3 pt-md-3">
          <Col lg="8">
            <h1 className="display-4 mb-4">Injury List</h1>
            <hr className="t_border my-4 ml-0 text-left" />
          </Col>
        </Row>
        <InjuryListTable />
      </Container>
    </HelmetProvider>
  );
};
