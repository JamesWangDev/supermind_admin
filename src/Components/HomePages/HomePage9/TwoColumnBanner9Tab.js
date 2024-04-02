import React, { useState } from "react";
import CheckBoxField from "../../InputFields/CheckBoxField";
import TabTitle from "../../Coupon/TabTitle";
import { TabContent, TabPane } from "reactstrap";
import { MainRightSidebarBannerTab } from "../../../Data/TabTitleListData";
import FileUploadField from "../../InputFields/FileUploadField";
import { getHelperText } from "../../../Utils/CustomFunctions/getHelperText";
import CommonRedirect from "../CommonRedirect";

const TwoColumnBanner9Tab = ({ values, setFieldValue, productData, categoryData, setSearch }) => {
    const [activeTab, setActiveTab] = useState("1");
    return (
        <>
            <CheckBoxField name={`[content][two_column_banners][status]`} title="Status" />
            <div className="inside-horizontal-tabs">
                <TabTitle activeTab={activeTab} setActiveTab={setActiveTab} titleList={MainRightSidebarBannerTab} />
                <TabContent activeTab={activeTab}>
                    <TabPane tabId="1">
                        <FileUploadField name={'twoColumnBanner1Image'} showImage={values['twoColumnBanner1Image']} title='Image' id={'twoColumnBanner1Image'} type="file" values={values} setFieldValue={setFieldValue} helpertext={getHelperText('1030x244px')} />
                        <CommonRedirect values={values} setFieldValue={setFieldValue} productData={productData} categoryData={categoryData} nameList={{ selectNameKey: 'twoBanners1LinkType', multipleNameKey: 'twoBanners1Link' }} setSearch={setSearch} />
                    </TabPane>
                    <TabPane tabId="2">
                        <FileUploadField name={'twoColumnBanner2Image'} showImage={values['twoColumnBanner2Image']} title='Image' id={'twoColumnBanner2Image'} type="file" values={values} setFieldValue={setFieldValue} helpertext={getHelperText('506x244px')} />
                        <CommonRedirect values={values} setFieldValue={setFieldValue} productData={productData} categoryData={categoryData} nameList={{ selectNameKey: 'twoBanners2LinkType', multipleNameKey: 'twoBanners2Link' }} setSearch={setSearch} />
                    </TabPane>
                </TabContent>
            </div >
        </>
    )
}
export default TwoColumnBanner9Tab