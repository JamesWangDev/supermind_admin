import React, { useContext } from "react";
import { Col, Container, Row } from "reactstrap";
import SettingContext from "../../Helper/SettingContext";
import I18NextContext from "@/Helper/I18NextContext";
import { useTranslation } from "@/app/i18n/client";

const Footer = () => {
  const { i18Lang } = useContext(I18NextContext);
  const { t } = useTranslation(i18Lang, 'common');
  const { state } = useContext(SettingContext)
  return (
    <Container fluid={true}>
      <footer className="footer">
        <Row>
          <Col md="12" className="footer-copyright text-center">
          <p className="mb-0">{t(state?.setCopyRight?state?.setCopyRight:'© Pixelstrap')}</p>
          </Col>
        </Row>
      </footer>
    </Container>
  );
};

export default Footer;
