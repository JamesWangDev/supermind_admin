import React, { useState } from 'react'
import CheckBoxField from '../../InputFields/CheckBoxField';
import TabTitle from '../../Coupon/TabTitle';
import { TabContent, TabPane } from 'reactstrap';
import { MainRightSidebarBannerTab } from '../../../Data/TabTitleListData';
import CommonDeliveryBanner from './CommonDeliveryBanner';

const DeliveryBanner5Tab = ({ values, setFieldValue, categoryData, productData, setSearch }) => {
    const [activeTab, setActiveTab] = useState("1");
    return (
        <>
            <CheckBoxField name={`[content][delivery_banners][status]`} title="Status" />
            <div className="inside-horizontal-tabs">
                <TabTitle activeTab={activeTab} setActiveTab={setActiveTab} titleList={MainRightSidebarBannerTab} />
                <TabContent activeTab={activeTab}>
                    <TabPane tabId="1">
                        <CommonDeliveryBanner values={values} setFieldValue={setFieldValue} bannerName={'banner_1'} imageName={'twoColumnBanner1Image'} list={true} selectNameKey={'delivery1LinkType'} multipleNameKey={'delivery1Link'} productData={productData} categoryData={categoryData} setSearch={setSearch} />
                    </TabPane>
                    <TabPane tabId="2">
                        <CommonDeliveryBanner values={values} setFieldValue={setFieldValue} bannerName={'banner_2'} imageName={'twoColumnBanner2Image'} selectNameKey={'delivery2LinkType'} multipleNameKey={'delivery2Link'} categoryData={categoryData} productData={productData} setSearch={setSearch} />
                    </TabPane>
                </TabContent>
            </div >
        </>
    )
}

export default DeliveryBanner5Tab