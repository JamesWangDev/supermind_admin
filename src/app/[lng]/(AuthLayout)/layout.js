"use client";
import React, { useContext, useEffect } from "react";
import I18NextContext from "@/Helper/I18NextContext";
import { Col, Container, Row } from "reactstrap";

const AuthLayout = ({ children, params: { lng } }) => {
  const { i18Lang, setI18Lang } = useContext(I18NextContext);

  useEffect(() => {
    if (i18Lang == "") {
      setI18Lang(lng);
    }
  }, [lng]);
  return (
    <section className="log-in-section section-b-space">
      <Container className="w-100">
        <Row>
          <Col xl="5" lg="6" className="me-auto">
            {children}
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default AuthLayout;
