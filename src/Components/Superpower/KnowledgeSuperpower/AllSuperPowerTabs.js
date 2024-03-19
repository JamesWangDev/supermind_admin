import { Col, TabContent, TabPane } from 'reactstrap'
import GeneralTab from '../GeneralTab'
import AddKnowledgeTab from './AddKnowledgeTab'
import AddActions from '../ActionSuperpower/AddActions'

const AllSuperPowerTabs = ({ values, setFieldValue, errors, updateId, activeTab }) => {
    return (
        <Col xl="9" lg="9">
            <TabContent activeTab={activeTab}>
                <TabPane tabId="1">
                    <GeneralTab values={values} setFieldValue={setFieldValue} errors={errors} updateId={updateId} />
                </TabPane>
                <TabPane tabId="2">
                    <AddActions values={values} setFieldValue={setFieldValue} errors={errors} updateId={updateId} />
                </TabPane>
                <TabPane tabId="3">
                </TabPane>
                <TabPane tabId="4">
                    {/* <AddKnowledgeTab values={values} setFieldValue={setFieldValue} errors={errors} updateId={updateId} /> */}
                </TabPane>
                <TabPane tabId="5">
                </TabPane>
                <TabPane tabId="6">
                </TabPane>
                <TabPane tabId="7">
                </TabPane>
                <TabPane tabId="8">
                </TabPane>
                <TabPane tabId="9">
                </TabPane>
                <TabPane tabId="10">
                </TabPane>
            </TabContent>
        </Col>
    )
}

export default AllSuperPowerTabs