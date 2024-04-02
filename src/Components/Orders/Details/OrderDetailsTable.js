import { Card, CardBody, Col, Container, Row } from 'reactstrap'
import DetailTable from './DetailTable'
import I18NextContext from '@/Helper/I18NextContext';
import { useContext } from 'react';
import { useTranslation } from '@/app/i18n/client';

const OrderDetailsTable = ({ moduleName, data }) => {
    const { i18Lang } = useContext(I18NextContext);
    const { t } = useTranslation(i18Lang, 'common');
    return (
        <Container fluid={true}>
            <Row>
                <Col xs="12">
                    <Card >
                        <CardBody>
                            <div className="title-header">
                                <div className="d-flex align-items-center"><h5 >{t(moduleName)}</h5></div>
                            </div>
                            <DetailTable data={data} />
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}

export default OrderDetailsTable