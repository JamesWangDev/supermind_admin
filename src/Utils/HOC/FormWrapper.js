import I18NextContext from "@/Helper/I18NextContext";
import { useTranslation } from "@/app/i18n/client";
import { useContext } from "react";
import { Card, CardBody, Col, Row } from "reactstrap";

const FormWrapper = (props) => {
  const { i18Lang } = useContext(I18NextContext);
  const { t } = useTranslation(i18Lang, 'common');
  return (
    <Row>
      <Col xxl="8" xl="10" className="m-auto">
        <Card>
          <CardBody>
            <div className="title-header option-title">
              <h5>{t(props.title)}</h5>
              {props.modal && props.modal}
            </div>
            {props.children}
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
};

export default FormWrapper;
