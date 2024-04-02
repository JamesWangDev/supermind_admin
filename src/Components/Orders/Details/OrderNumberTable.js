import React from 'react'
import { Card, CardBody, Col, Container, Row } from 'reactstrap'
import UpdateStatus from './UpdateStatus'
import { Form, Formik } from 'formik'
import NumberTable from './NumberTable'

const OrderNumberTable = ({ moduleName, data, orderStatusData, setOrderStatus, orderStatus, mutate, orderStatusUpdate, edit }) => {
    return (
        <Container fluid={true}>
            <Row>
                <Col xs="12">
                    <Card>
                        <CardBody>
                            <div className="title-header">
                                <div className="d-flex align-items-center"><h5>{moduleName}</h5>

                                </div>
                                {edit && <Formik initialValues={{
                                    order_status_id: ""
                                }}>
                                    {({ values, setFieldValue }) => (
                                        <Form>
                                            {!data?.sub_orders?.length &&
                                                (orderStatus?.slug != 'cancelled' && orderStatus?.slug != 'delivered')
                                                && <UpdateStatus values={values} setFieldValue={setFieldValue} orderStatusData={orderStatusData} data={data} setOrderStatus={setOrderStatus} orderStatus={orderStatus} mutate={mutate} orderStatusUpdate={orderStatusUpdate} />}
                                        </Form>
                                    )}
                                </Formik>}
                            </div>
                            <NumberTable data={data} />
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}

export default OrderNumberTable