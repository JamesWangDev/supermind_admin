
import { Col, Row } from "reactstrap"
import DashboardWrapper from "./DashboardWrapper"
import DashboardChart from "./DashboardChart"
import { Form, Formik } from "formik"
import TopStoreTabel from "./TopStore/TopStoreTable"

const RevenueAndTopVendor = () => {
    return (
        <Row className="dashboard-form theme-form">
            <Col xl={8} md={6} >
                <DashboardWrapper classes={{ colProps: { sm: 12 }, title: "AverageRevenue" }}>
                    <DashboardChart />
                </DashboardWrapper>
            </Col>
            <Col xl={4} md={6}>
                <Formik initialValues={{ filter_by: "" }}>
                    {({ values, setFieldValue }) => (
                        <Form>
                            <TopStoreTabel values={values} setFieldValue={setFieldValue} />
                        </Form>
                    )}
                </Formik>

            </Col>
        </Row >
    )
}

export default RevenueAndTopVendor