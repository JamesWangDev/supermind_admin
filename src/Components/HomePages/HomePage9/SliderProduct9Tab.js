import React, { useState } from 'react'
import TabTitle from '../../Coupon/TabTitle'
import { TabContent, TabPane } from 'reactstrap'
import { SliderProduct9Title } from '../../../Data/TabTitleListData';
import SliderProductBannerTab from './SliderProductBannerTab';
import SliderProductSidebar from './SliderProductSidebar';

const SliderProduct9Tab = ({ values, setFieldValue, productData, setSearch, categoryData }) => {
    const [activeTab, setActiveTab] = useState("1");
    return (
        <div className="inside-horizontal-tabs">
            <TabTitle activeTab={activeTab} setActiveTab={setActiveTab} titleList={SliderProduct9Title} />
            <TabContent activeTab={activeTab}>
                <TabPane tabId="1">
                    <SliderProductBannerTab values={values} setFieldValue={setFieldValue} productData={productData} setSearch={setSearch} categoryData={categoryData} />
                </TabPane>
                <TabPane tabId="2">
                    <SliderProductSidebar values={values} setFieldValue={setFieldValue} productData={productData} setSearch={setSearch} categoryData={categoryData} />
                </TabPane>
            </TabContent>
        </div >
    )
}

export default SliderProduct9Tab