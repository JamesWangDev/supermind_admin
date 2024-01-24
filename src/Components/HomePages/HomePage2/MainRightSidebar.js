import React, { useState } from 'react'
import TabTitle from '../../Coupon/TabTitle'
import { TabContent, TabPane } from 'reactstrap'
import { MainRightSidebarBannerTab } from '../../../Data/TabTitleListData'
import CheckBoxField from '../../InputFields/CheckBoxField'
import MainRightBanner1 from './MainRightBanner1'
import MainRightBanner2 from './MainRightBanner2'

const MainRightSidebar = ({ values, setFieldValue, productData, categoryData, setSearch }) => {
    const [activeTab, setActiveTab] = useState("1");
    return (
        <>
            <CheckBoxField name={`[content][main_content][sidebar][status]`} title="Status" />
            <div className="inside-horizontal-tabs">
                <TabTitle activeTab={activeTab} setActiveTab={setActiveTab} titleList={MainRightSidebarBannerTab} />
                <TabContent activeTab={activeTab}>
                    <TabPane tabId="1">
                        <MainRightBanner1 values={values} setFieldValue={setFieldValue} productData={productData} categoryData={categoryData} setSearch={setSearch} />
                    </TabPane>
                    <TabPane tabId="2">
                        <MainRightBanner2 values={values} setFieldValue={setFieldValue} productData={productData} categoryData={categoryData} setSearch={setSearch} />
                    </TabPane>
                </TabContent>
            </div >
        </>
    )
}

export default MainRightSidebar