import { Col, TabContent, TabPane } from 'reactstrap'
import GeneralTab from './GeneralTab'

const AllSuperPowerTabs = ({ values, setFieldValue, errors, updateId, activeTab }) => {
    return (
        <Col xl="9" lg="9">
            <TabContent activeTab={activeTab}>
                <TabPane tabId="1">
                    <GeneralTab values={values} setFieldValue={setFieldValue} errors={errors} updateId={updateId} />
                </TabPane>
                <TabPane tabId="2">
                    {/* <AddKnowledgeTab values={values} setFieldValue={setFieldValue} errors={errors} updateId={updateId} /> */}
                </TabPane>
            </TabContent>
        </Col>
    )
}

export default AllSuperPowerTabs