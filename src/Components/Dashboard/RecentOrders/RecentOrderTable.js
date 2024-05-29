import { Col, Row } from "reactstrap"
import { OrderAPI } from "../../../Utils/AxiosUtils/API"
import RecentOrders from "./RecentOrders"
import { Form, Formik } from "formik"
import TopSellingProduct from "./TopSellingProduct"

const RecentOrderTable = () => {
    return (
        <Row className="theme-form dashboard-form">
            <Col xl={12} md={12} className="">
                <Formik initialValues={{ filter_by: "" }}>
                    {({ values, setFieldValue }) => (
                        <Form>
                            <TopSellingProduct values={values} setFieldValue={setFieldValue} />
                        </Form>
                    )}
                </Formik>
            </Col >
            {/* <Col xl={7} md={6}>
                <RecentOrders url={OrderAPI} moduleName={'RecentOrders'} paramsProps={{ paginate: 7 }} filterHeader={{
                    noPagination: true, noSearch: true, noPageDrop: true
                }} />
            </Col> */}
        </Row >
    )
}

export default RecentOrderTable