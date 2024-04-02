import React, { useContext, useState } from 'react'
import SimpleInputField from '../../InputFields/SimpleInputField'
import CheckBoxField from '../../InputFields/CheckBoxField'
import TabTitle from '../../Coupon/TabTitle'
import { TabContent, TabPane } from 'reactstrap'
import { ProductWithDealTab } from '../../../Data/TabTitleListData'
import ProductListTab from './ProductListTab'
import DealOfProductTabs from './DealOfProductTabs'
import I18NextContext from '@/Helper/I18NextContext'
import { useTranslation } from '@/app/i18n/client'

const ProductWithDeals = ({ values, setFieldValue, productData, setSearch }) => {
    const [activeTab, setActiveTab] = useState("1");
    const { i18Lang } = useContext(I18NextContext);
    const { t } = useTranslation(i18Lang, 'common');
    return (
        <>
            <SimpleInputField nameList={[{ name: `[content][product_with_deals][title]`, placeholder: t("EnterTitle"), title: "Title" }
            ]} />
            <CheckBoxField name={`[content][product_with_deals][status]`} title="Status" />
            <div className="inside-horizontal-tabs">
                <TabTitle activeTab={activeTab} setActiveTab={setActiveTab} titleList={ProductWithDealTab} />
                <TabContent activeTab={activeTab}>
                    <TabPane tabId="1">
                        <ProductListTab values={values} setFieldValue={setFieldValue} bannerName={'banner_1'} imageName={'twoColumnBanner1Image'} productData={productData} setSearch={setSearch} />
                    </TabPane>
                    <TabPane tabId="2">
                        <DealOfProductTabs values={values} setFieldValue={setFieldValue} bannerName={'banner_2'} productData={productData} setSearch={setSearch} />
                    </TabPane>
                </TabContent>
            </div >
        </>
    )
}

export default ProductWithDeals