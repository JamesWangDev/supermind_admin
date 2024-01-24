import { Col, TabContent, TabPane } from 'reactstrap'
import HomeBannerTab from "./HomeBannerTab";
import CategoryIconList from "./CategoryIconList";
import CouponTab from "./CouponTab";
import ProductList1Tab from "./ProductList1Tab";
import OfferBannerTab from "./OfferBannerTab";
import ProductList2Tab from "./ProductList2Tab";
import ProductBundleTab from "./ProductBundleTab";
import NewsLetterTab from "./NewsLetterTab";
import FeatureBlogTab from "./FeatureBlogTab";
import SliderProductTab from "./SliderProductTab";
import { useQuery } from '@tanstack/react-query';
import { Category, product } from '../../../Utils/AxiosUtils/API';
import request from '../../../Utils/AxiosUtils';
import placeHolderImage from "../../../../public/assets/images/placeholder.png";
import Loader from '../../CommonComponent/Loader';
import { forwardRef, useEffect, useImperativeHandle, useState } from 'react';

const AllTabsHomePage3 = forwardRef(({ activeTab, values, setFieldValue }, ref) => {
    const [search, setSearch] = useState(false);
    const [customSearch, setCustomSearch] = useState("")
    const [tc, setTc] = useState(null);

    const { data: productData, isLoading: productLoader, refetch } = useQuery([product], () => request({
        url: product, params:
        {
            status: 1,
            search: customSearch ? customSearch : '',
            paginate: values['content']?.['products_ids']?.length > 15 ? values['content']?.['products_ids']?.length : 15,
            ids: customSearch ? null : values['content']['products_ids'].join() || null,
            with_union_products: values['content']?.['products_ids']?.length ? values['content']?.['products_ids']?.length >= 15 ? 0 : 1 : 0
        }
    }), {
        refetchOnWindowFocus: false, select: (res) => res?.data?.data.map((elem) => { return { id: elem.id, name: elem.name, image: elem?.product_thumbnail?.original_url || placeHolderImage, slug: elem?.slug } })
    });
    const { data: categoryData, isLoading: categoryLoader } = useQuery([Category], () => request({ url: Category, params: { status: 1, type: 'product' } }), {
        refetchOnWindowFocus: false, select: (res) => res?.data?.data.map((elem) => { return { id: elem.id, name: elem.name, image: elem?.category_icon?.original_url || placeHolderImage, slug: elem?.slug } })
    });
    useImperativeHandle(ref, () => ({
        call() {
            refetch();
        }
    }));

    // Added debouncing
    useEffect(() => {
        if (tc) clearTimeout(tc);
        setTc(setTimeout(() => setCustomSearch(search), 500));
    }, [search])
    // Getting users data on searching users
    useEffect(() => {
        refetch()
    }, [customSearch])
    if (productLoader || categoryLoader) return <Loader />
    return (
        <Col xl="7" lg="8">
            <TabContent activeTab={activeTab}>
                <TabPane tabId="1"><HomeBannerTab values={values} setFieldValue={setFieldValue} categoryData={categoryData} productData={productData} setSearch={setSearch} /></TabPane>
                <TabPane tabId="2"><CategoryIconList values={values} setFieldValue={setFieldValue} isTitleDescription={true} categoryData={categoryData} /></TabPane>
                <TabPane tabId="3"><CouponTab values={values} setFieldValue={setFieldValue} categoryData={categoryData} productData={productData} setSearch={setSearch} /></TabPane>
                <TabPane tabId="4"><ProductList1Tab values={values} setFieldValue={setFieldValue} productData={productData} setSearch={setSearch} /></TabPane>
                <TabPane tabId="5"><OfferBannerTab values={values} setFieldValue={setFieldValue} categoryData={categoryData} productData={productData} setSearch={setSearch} /></TabPane>
                <TabPane tabId="6"><ProductList2Tab values={values} setFieldValue={setFieldValue} productData={productData} setSearch={setSearch} /></TabPane>
                <TabPane tabId="7"><ProductBundleTab values={values} setFieldValue={setFieldValue} /></TabPane>
                <TabPane tabId="8"><SliderProductTab values={values} setFieldValue={setFieldValue} productData={productData} setSearch={setSearch} /></TabPane>
                <TabPane tabId="9"><FeatureBlogTab values={values} setFieldValue={setFieldValue} /></TabPane>
                <TabPane tabId="10"><NewsLetterTab values={values} setFieldValue={setFieldValue} /></TabPane>
            </TabContent>
        </Col>
    )
})
export default AllTabsHomePage3