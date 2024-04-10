import React from 'react';
import { Col, Container, Row } from 'reactstrap';

const AuthLayout = (props) => {
  return (
    <section className='log-in-section section-b-space'>
      <Container className='w-100'>
        <Row>
          {
            props?.customCol ?
              <Col xl={7}>
                {props.children}
              </Col>
              :
              <Col xl='5' lg='6' className='me-auto'>
                {props.children}
              </Col>
          }
        </Row>
      </Container>
    </section>
  );
};

export default AuthLayout;
