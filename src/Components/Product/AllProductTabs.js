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

const AllProductTabs = ({ values, setFieldValue, errors, updateId, activeTab }) => {
    return (
        <Col xl="7" lg="8">
            <TabContent activeTab={activeTab}>
                <TabPane tabId="1" className="some">
                    <GeneralTab values={values} setFieldValue={setFieldValue} errors={errors} updateId={updateId} />
                </TabPane>
                <TabPane tabId="2">
                    <LLMTool />
                </TabPane>
                <TabPane tabId="3">
                    <AddSuperpowersTab values={values} setFieldValue={setFieldValue} errors={errors} updateId={updateId} />
                </TabPane>
                <TabPane tabId="4">
                    <PersonalityLimitsTab values={values} setFieldValue={setFieldValue} errors={errors} updateId={updateId} />
                </TabPane>
                <TabPane tabId="5">
                    {/* <SeoTab values={values} setFieldValue={setFieldValue} updateId={updateId} /> */}
                </TabPane>
                <TabPane tabId="6">
                    {/* <ShippingTaxTab /> */}
                </TabPane>
                <TabPane tabId="7">
                    {/* <OptionsTab /> */}
                </TabPane>
            </TabContent>
        </Col>
    )
}

export default AllProductTabs