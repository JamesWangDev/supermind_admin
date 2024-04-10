import React, { useState } from 'react'
import TabTitle from '../../Coupon/TabTitle';
import { TabContent, TabPane } from 'reactstrap';
import FileUploadField from '../../InputFields/FileUploadField';
import { ThemeOneHomeHorizontalTab } from '../../../Data/TabTitleListData';
import { getHelperText } from '../../../Utils/CustomFunctions/getHelperText';
import CommonRedirect from '../CommonRedirect';

const HomePageBanner = ({ values, setFieldValue, productData, categoryData, setSearch }) => {
    const [activeTab, setActiveTab] = useState("1");
    return (
        <div className="inside-horizontal-tabs">
            <TabTitle activeTab={activeTab} setActiveTab={setActiveTab} titleList={ThemeOneHomeHorizontalTab} />
            <TabContent activeTab={activeTab}>
                <TabPane tabId="1">
                    <FileUploadField name="homeMainBannerImage" title='Image' id="homeMainBannerImage" showImage={values['homeMainBannerImage']} type="file" values={values} setFieldValue={setFieldValue} helpertext={getHelperText('806x670px')} />
                    <CommonRedirect values={values} setFieldValue={setFieldValue} productData={productData} categoryData={categoryData} nameList={{ selectNameKey: 'homeBannerLinkType', multipleNameKey: 'homeBannerLink' }} setSearch={setSearch} />
                </TabPane>
                <TabPane tabId="2">
                    <FileUploadField name="homeMainSubBanner1Image" title='Image' id="homeMainSubBanner1Image" showImage={values['homeMainSubBanner1Image']} type="file" values={values} setFieldValue={setFieldValue} helpertext={getHelperText('377x670px')} />
                    <CommonRedirect values={values} setFieldValue={setFieldValue} productData={productData} categoryData={categoryData} nameList={{ selectNameKey: 'homeSubBanner1LinkType', multipleNameKey: 'homeSubBanner1Link' }} setSearch={setSearch} />
                </TabPane>
                <TabPane tabId="3">
                    <FileUploadField name="homeMainSubBanner2Image" title='Image' id="homeMainSubBanner2Image" showImage={values['homeMainSubBanner2Image']} type="file" values={values} setFieldValue={setFieldValue} helpertext={getHelperText('377x670px')} />
                    <CommonRedirect values={values} setFieldValue={setFieldValue} productData={productData} categoryData={categoryData} nameList={{ selectNameKey: 'homeSubBanner2LinkType', multipleNameKey: 'homeSubBanner2Link' }} setSearch={setSearch} />
                </TabPane>
            </TabContent>
        </div>
    )
}

export default HomePageBanner