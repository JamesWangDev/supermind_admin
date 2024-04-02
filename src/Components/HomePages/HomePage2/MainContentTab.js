import React, { useState } from 'react'
import TabTitle from '../../Coupon/TabTitle'
import { TabContent, TabPane } from 'reactstrap'
import { ThemeOneMainHorizontalTab2 } from '../../../Data/TabTitleListData';
import MainLeftSidebar from './MainLeftSidebar';
import MainRightSidebar from './MainRightSidebar';

const MainContentTab = ({ values, setFieldValue, productData, categoryData, setSearch }) => {
    const [activeTab, setActiveTab] = useState("1");
    return (
        <div className="inside-horizontal-tabs">
            <TabTitle activeTab={activeTab} setActiveTab={setActiveTab} titleList={ThemeOneMainHorizontalTab2} />
            <TabContent activeTab={activeTab}>
                <TabPane tabId="1">
                    <MainLeftSidebar values={values} setFieldValue={setFieldValue} productData={productData} setSearch={setSearch} />
                </TabPane>
                <TabPane tabId="2">
                    <MainRightSidebar values={values} setFieldValue={setFieldValue} productData={productData} categoryData={categoryData} setSearch={setSearch} />
                </TabPane>
            </TabContent>
        </div >
    )
}

export default MainContentTab