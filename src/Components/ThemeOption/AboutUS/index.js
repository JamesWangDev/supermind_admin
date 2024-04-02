import { useState } from "react";
import { TabContent, TabPane } from "reactstrap"
import TabTitle from "../../Coupon/TabTitle"
import { AboutUsTabTitle } from "../../../Data/TabTitleListData";
import AboutTab from "./AboutTab";
import ClientTab from "./ClientTab";
import TeamTab from "./TeamTab";
import TestimonialTab from "./TestimonialTab";
import BlogTab from "./BlogTab";

const AboutUsTab = ({ values, setFieldValue }) => {
    const [activeTab, setActiveTab] = useState("1");
    return (
        <div className="inside-horizontal-tabs">
            <TabTitle activeTab={activeTab} setActiveTab={setActiveTab} titleList={AboutUsTabTitle} />
            <TabContent activeTab={activeTab}>
                <TabPane tabId="1">
                    <AboutTab values={values} setFieldValue={setFieldValue} />
                </TabPane>
                <TabPane tabId="2">
                    <ClientTab values={values} setFieldValue={setFieldValue} />
                </TabPane>
                <TabPane tabId="3">
                    <TeamTab values={values} setFieldValue={setFieldValue} />
                </TabPane>
                <TabPane tabId="4">
                    <TestimonialTab values={values} setFieldValue={setFieldValue} />
                </TabPane>
                <TabPane tabId="5">
                    <BlogTab values={values} setFieldValue={setFieldValue} />
                </TabPane>
            </TabContent>
        </div>
    )
}

export default AboutUsTab