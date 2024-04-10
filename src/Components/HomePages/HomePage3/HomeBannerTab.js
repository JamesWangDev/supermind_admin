import React, { useState } from "react";
import { TabContent, TabPane } from "reactstrap";
import TabTitle from "../../Coupon/TabTitle";
import { getHelperText } from '../../../Utils/CustomFunctions/getHelperText';
import FileUploadField from "../../InputFields/FileUploadField";
import { ThemeThreeHomeHorizontalTab } from "../../../Data/TabTitleListData";
import CommonRedirect from "../CommonRedirect";

const HomeBannerTab = ({ values, setFieldValue, categoryData, productData, setSearch }) => {
    const [activeTab, setActiveTab] = useState("1");
    return (
        <div className="inside-horizontal-tabs">
            <TabTitle activeTab={activeTab} setActiveTab={setActiveTab} titleList={ThemeThreeHomeHorizontalTab} />
            <TabContent activeTab={activeTab}>
                <TabPane tabId="1">
                    <FileUploadField name="homeBannerMainImage" title='Image' id="homeBannerMainImage" showImage={values['homeBannerMainImage']} type="file" values={values} setFieldValue={setFieldValue} helpertext={getHelperText('1155x670px')} />
                    <CommonRedirect values={values} setFieldValue={setFieldValue} productData={productData} categoryData={categoryData} nameList={{ selectNameKey: 'homeBannerLinkType', multipleNameKey: 'homeBannerLink' }} setSearch={setSearch} />
                </TabPane>
                <TabPane tabId="2">
                    <FileUploadField name="homeBannerSubBannerImage" title='Image' id="homeBannerSubBannerImage" showImage={values['homeBannerSubBannerImage']} type="file" values={values} setFieldValue={setFieldValue} helpertext={getHelperText('415x670px')} />
                    <CommonRedirect values={values} setFieldValue={setFieldValue} productData={productData} categoryData={categoryData} nameList={{ selectNameKey: 'homeSubBanner1LinkType', multipleNameKey: 'homeSubBanner1Link' }} setSearch={setSearch} />
                </TabPane>
            </TabContent>
        </div>
    )
}
export default HomeBannerTab