import { Col, TabContent, TabPane } from 'reactstrap'
import GeneralTab from './GeneralTab'
import InventoryTab from './InventoryTab'
import SetupTab from './SetupTab'
import ImagesTab from './ImagesTab'
import SeoTab from './SeoTab'
import ShippingTaxTab from './ShippingTaxTab'
import OptionsTab from './OptionsTab'
import LLMTool from './PromptAndModelsTabs'
import AddSuperpowersTab from './AddSuperpowersTab'
import PersonalityLimitsTab from './PersonalityLimitsTab'
import AddKnowledgeTab from './AddKnowledgeTab'

const AllSuperPowerTabs = ({ values, setFieldValue, errors, updateId, activeTab }) => {
    return (
        <Col xl="9" lg="9">
            <TabContent activeTab={activeTab}>
                <TabPane tabId="1">
                </TabPane>
                <TabPane tabId="2">
                </TabPane>
                <TabPane tabId="3">
                </TabPane>
                <TabPane tabId="4">
                    <AddKnowledgeTab />
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