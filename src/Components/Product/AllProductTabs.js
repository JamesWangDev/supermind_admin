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
import PromptAndModels2 from './PromptAndModels2'
import ChatBox from '../Chat/ChatBox'
import AddUISuperpowersTab from './AddUISuperpowersTab'
import AddActionSuperpowersTab from './AddActionSuperpowersTab'
import PaymentAndPricingTab from './PaymentAndPricingTab'

const AllProductTabs = ({ values, setFieldValue, errors, updateId, activeTab }) => {
    return (
        <Col xl="9" lg="9">
            <TabContent activeTab={activeTab}>
                <TabPane tabId="1" className="some">
                    <GeneralTab values={values} setFieldValue={setFieldValue} errors={errors} updateId={updateId} />
                </TabPane>
                <TabPane tabId="2">
                    <PersonalityLimitsTab values={values} setFieldValue={setFieldValue} errors={errors} updateId={updateId} />
                </TabPane>
                <TabPane tabId="3">
                    <PromptAndModels2 values={values} setFieldValue={setFieldValue} errors={errors} updateId={updateId} />
                </TabPane>
                <TabPane tabId="4">
                    <AddActionSuperpowersTab values={values} setFieldValue={setFieldValue} errors={errors} updateId={updateId} />
                </TabPane>
                <TabPane tabId="5">
                    <AddSuperpowersTab values={values} setFieldValue={setFieldValue} errors={errors} updateId={updateId} />
                </TabPane>
                <TabPane tabId="6">
                    <AddUISuperpowersTab values={values} setFieldValue={setFieldValue} errors={errors} updateId={updateId} />
                </TabPane>
                <TabPane tabId="7">
                    <PaymentAndPricingTab values={values} setFieldValue={setFieldValue} errors={errors} updateId={updateId} />
                </TabPane>
                <TabPane tabId="8">
                    {/* <OptionsTab /> */}
                </TabPane>
                <ChatBox values={values} activeTab={activeTab} />
            </TabContent>
        </Col>
    )
}

export default AllProductTabs