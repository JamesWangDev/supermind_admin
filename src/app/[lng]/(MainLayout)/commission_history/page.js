'use client'
import { Col } from "reactstrap"
import { commissions } from "@/Utils/AxiosUtils/API"
import AllCommissionTable from "@/Components/Commission"

const Commission = () => {
    return (
        <Col sm="12">
            <AllCommissionTable moduleName="Commission" url={commissions} dateRange={true} />
        </Col>
    )
}

export default Commission