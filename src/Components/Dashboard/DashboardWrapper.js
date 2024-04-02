import I18NextContext from '@/Helper/I18NextContext';
import { useTranslation } from '@/app/i18n/client';
import { useContext } from 'react';
import { Card, CardBody, Col, Container, Row } from 'reactstrap'

const DashboardWrapper = ({ classes = {} ,children }) => {
  const { i18Lang } = useContext(I18NextContext);
  const { t } = useTranslation(i18Lang, "common");
    return (
        <Container fluid={true}>
            <Row>
                <Col {...classes?.colProps}>
                    <Card>
                        <CardBody>
                            <div className="title-header">
                                <div className="d-flex align-items-center">
                                    <h5>{t(classes?.title)}</h5>
                                </div>
                                {classes?.headerRight}
                            </div>
                            {children}
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}

export default DashboardWrapper