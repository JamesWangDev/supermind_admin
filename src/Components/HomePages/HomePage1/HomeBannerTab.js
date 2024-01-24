import React, { useState } from 'react'
import TabTitle from '../../Coupon/TabTitle'
import { TabContent, TabPane } from 'reactstrap'
import { ThemeOneHomeHorizontalTab } from '../../../Data/TabTitleListData';
import FileUploadField from '../../InputFields/FileUploadField';
import { getHelperText } from '../../../Utils/CustomFunctions/getHelperText';
import CommonRedirect from '../CommonRedirect';

const HomeBannerTab = ({ values, setFieldValue, productData, categoryData, setSearch }) => {
  const [activeTab, setActiveTab] = useState("1");
  return (
    <div className="inside-horizontal-tabs">
      <TabTitle activeTab={activeTab} setActiveTab={setActiveTab} titleList={ThemeOneHomeHorizontalTab} />
      <TabContent activeTab={activeTab}>
        <TabPane tabId="1">
          <FileUploadField name="homeBannerMainImage" title='Image' id="homeBannerMainImage" showImage={values['homeBannerMainImage']} type="file" values={values} setFieldValue={setFieldValue} helpertext={getHelperText('1155x670px')} />
          <CommonRedirect values={values} setFieldValue={setFieldValue} productData={productData} categoryData={categoryData} nameList={{ selectNameKey: 'homeBannerLinkType', multipleNameKey: 'homeBannerLink' }} setSearch={setSearch} />
        </TabPane>
        <TabPane tabId="2">
          <FileUploadField name="homeBannerSubBanner1Image" title='Image' id="homeBannerSubBanner1Image" showImage={values['homeBannerSubBanner1Image']} type="file" values={values} setFieldValue={setFieldValue} helpertext={getHelperText('415x320px')} />
          <CommonRedirect values={values} setFieldValue={setFieldValue} productData={productData} categoryData={categoryData} nameList={{ selectNameKey: 'homeSubBanner1LinkType', multipleNameKey: 'homeSubBanner1Link' }} />
        </TabPane>
        <TabPane tabId="3">
          <FileUploadField name="homeBannerSubBanner2Image" title='Image' id="homeBannerSubBanner2Image" showImage={values['homeBannerSubBanner2Image']} type="file" values={values} setFieldValue={setFieldValue} helpertext={getHelperText('415x320px')} />
          <CommonRedirect values={values} setFieldValue={setFieldValue} productData={productData} categoryData={categoryData} nameList={{ selectNameKey: 'homeSubBanner2LinkType', multipleNameKey: 'homeSubBanner2Link' }} />
        </TabPane>
      </TabContent>
    </div>
  )
}

export default HomeBannerTab