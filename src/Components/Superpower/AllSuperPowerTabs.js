import { Col, TabContent, TabPane } from 'reactstrap'
import InventoryTab from '../Product/InventoryTab'
import SetupTab from '../Product/SetupTab'
import ImagesTab from '../Product/ImagesTab'
import SeoTab from '../Product/SeoTab'
import ShippingTaxTab from '../Product/ShippingTaxTab'
import OptionsTab from '../Product/OptionsTab'
import LLMTool from '../Product/PromptAndModelsTabs'
import AddSuperpowersTab from '../Product/AddSuperpowersTab'
import PersonalityLimitsTab from '../Product/PersonalityLimitsTab'
import GeneralTab from './GeneralTab'
import PromptAndModels2 from './PromptAndModels2'
import AddKnowledgeTab from './AddKnowledgeTab'
import AddActions from './AddActions'

const AllSuperPowerTabs = ({ values, setFieldValue, errors, updateId, activeTab }) => {
    return (
        <Col xl="9" lg="9">
            <TabContent activeTab={activeTab}>
                <TabPane tabId="1">
                    <GeneralTab values={values} setFieldValue={setFieldValue} errors={errors} updateId={updateId} />
                </TabPane>
                <TabPane tabId="2">
                    <PromptAndModels2 values={values} setFieldValue={setFieldValue} errors={errors} updateId={updateId} />
                </TabPane>
                <TabPane tabId="3">
                    <AddActions values={values} setFieldValue={setFieldValue} errors={errors} updateId={updateId} />
                </TabPane>
                <TabPane tabId="4">
                    <AddKnowledgeTab values={values} setFieldValue={setFieldValue} errors={errors} updateId={updateId} />
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