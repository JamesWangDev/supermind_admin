import React, { useState } from 'react'
import CheckBoxField from '../../InputFields/CheckBoxField';
import TabTitle from '../../Coupon/TabTitle';
import { TabContent, TabPane } from 'reactstrap';
import { MainRightSidebarBannerTab } from '../../../Data/TabTitleListData';
import TwoColumnBanner1 from './TwoColumnBanner1';

const TwoColumnBanner = ({ values, setFieldValue, subTitle, productData, categoryData, setSearch }) => {
    const [activeTab, setActiveTab] = useState("1");
    return (
        <>
            <CheckBoxField name={`[content][two_column_banners][status]`} title="Status" />
            <div className="inside-horizontal-tabs">
                <TabTitle activeTab={activeTab} setActiveTab={setActiveTab} titleList={MainRightSidebarBannerTab} />
                <TabContent activeTab={activeTab}>
                    <TabPane tabId="1">
                        <TwoColumnBanner1 values={values} setFieldValue={setFieldValue} bannerName={'banner_1'} imageName={'twoColumnBanner1Image'} subTitle={subTitle} productData={productData} categoryData={categoryData} selectNameKey={'twoBanner1LinkType'} multipleNameKey={'twoBanner1Link'} setSearch={setSearch} />
                    </TabPane>
                    <TabPane tabId="2">
                        <TwoColumnBanner1 values={values} setFieldValue={setFieldValue} bannerName={'banner_2'} imageName={'twoColumnBanner2Image'} subTitle={subTitle} productData={productData} categoryData={categoryData} selectNameKey={'twoBanner2LinkType'} multipleNameKey={'twoBanner2Link'} setSearch={setSearch} />
                    </TabPane>
                </TabContent>
            </div >
        </>
    )
}

export default TwoColumnBanner