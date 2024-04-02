import { TabPane } from 'reactstrap'
import TwoColumnBanner from '../HomePage4/TwoColumnBanner';
import FeatureBlog4 from '../HomePage4/FeatureBlog4';
import ProductListCategory6Tab from './ProductListCategory6Tab';
import DeliveryBanner5Tab from './DeliveryBanner5Tab';
import FullWidthBanner5 from './FullWidthBanner5';
import BankOfferTab from './BankOfferTab';
import ProductWithDeals from './ProductWithDeals';

const OrderTabs = ({ values, setFieldValue, productData, categoryData, setSearch }) => {
    return (
        <>
            <TabPane tabId="5">
                <BankOfferTab values={values} setFieldValue={setFieldValue} />
            </TabPane>
            <TabPane tabId="6">
                <ProductWithDeals values={values} setFieldValue={setFieldValue} productData={productData} setSearch={setSearch} />
            </TabPane>
            <TabPane tabId="7">
                <FullWidthBanner5 values={values} setFieldValue={setFieldValue} productData={productData} categoryData={categoryData} setSearch={setSearch} />
            </TabPane>
            <TabPane tabId="8">
                <ProductListCategory6Tab values={values} setFieldValue={setFieldValue} productName={'product2ProductIds'} nameKey={'products_list_2'} productData={productData} setSearch={setSearch} />
            </TabPane>
            <TabPane tabId="9">
                <ProductListCategory6Tab values={values} setFieldValue={setFieldValue} productName={'product3ProductIds'} nameKey={'products_list_3'} setSearch={setSearch} productData={productData} />
            </TabPane>
            <TabPane tabId="10">
                <TwoColumnBanner values={values} setFieldValue={setFieldValue} subTitle={true} productData={productData} categoryData={categoryData} />
            </TabPane>
            <TabPane tabId="11">
                <ProductListCategory6Tab values={values} setFieldValue={setFieldValue} productName={'product4ProductIds'} nameKey={'products_list_4'} productData={productData} setSearch={setSearch} />
            </TabPane>
            <TabPane tabId="12">
                <ProductListCategory6Tab values={values} setFieldValue={setFieldValue} productName={'product5ProductIds'} nameKey={'products_list_5'} productData={productData} setSearch={setSearch} />
            </TabPane>
            <TabPane tabId="13">
                <DeliveryBanner5Tab values={values} setFieldValue={setFieldValue} productData={productData} categoryData={categoryData} setSearch={setSearch} />
            </TabPane>
            <TabPane tabId="14">
                <ProductListCategory6Tab values={values} setFieldValue={setFieldValue} productName={'product6ProductIds'} nameKey={'products_list_6'} productData={productData} setSearch={setSearch} />
            </TabPane>
            <TabPane tabId="15">
                <ProductListCategory6Tab values={values} setFieldValue={setFieldValue} productName={'product7ProductIds'} nameKey={'products_list_7'} productData={productData} setSearch={setSearch} />
            </TabPane>
            <TabPane tabId="16">
                <FeatureBlog4 values={values} setFieldValue={setFieldValue} />
            </TabPane>
        </>
    )
}

export default OrderTabs