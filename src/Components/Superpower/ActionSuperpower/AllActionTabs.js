import { Col, TabContent, TabPane } from 'reactstrap'
import CreateActionsApi from './CreateActionsApi'
import CreateActionsFunction from './CreateActionsFunction'

const AllActionTabs = ({ activeTab }) => {
    return (
        <Col xl="9" lg="9">
            <TabContent activeTab={activeTab}>
                <TabPane tabId="1" className="some">
                    <CreateActionsApi />
                </TabPane>
                <TabPane tabId="2">
                    <CreateActionsFunction />
                </TabPane>
            </TabContent>
        </Col>
    )
}

export default AllActionTabs