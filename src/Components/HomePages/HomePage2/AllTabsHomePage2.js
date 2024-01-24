import { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { Col, TabContent, TabPane } from 'reactstrap'
import HomePageBanner from './HomePageBanner';
import CouponTab from '../HomePage3/CouponTab';
import CategoryIconList from '../HomePage3/CategoryIconList';
import FeatureBannerTab from '../HomePage1/FeatureBannerTab';
import MainContentTab from './MainContentTab';
import FullWidthBanner from './FullWidthBanner';
import SliderProductTab from '../HomePage3/SliderProductTab';
import NewsLetterTab from '../HomePage3/NewsLetterTab';
import { useQuery } from '@tanstack/react-query';
import { Category, product } from '../../../Utils/AxiosUtils/API';
import request from '../../../Utils/AxiosUtils';
import Loader from '../../CommonComponent/Loader';
import placeHolderImage from "../../../../public/assets/images/placeholder.png";

const AllTabsHomePage2 = forwardRef(({ activeTab, values, setFieldValue }, ref) => {
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
                <TabPane tabId="1">
                    <HomePageBanner values={values} setFieldValue={setFieldValue} productData={productData} categoryData={categoryData} setSearch={setSearch} />
                </TabPane>
                <TabPane tabId="2">
                    <CategoryIconList values={values} setFieldValue={setFieldValue} helpertext={'155x155px'} categoryData={categoryData} />
                </TabPane>
                <TabPane tabId="3">
                    <CouponTab values={values} setFieldValue={setFieldValue} helpertext={'1600x138px'} productData={productData} categoryData={categoryData} setSearch={setSearch} />
                </TabPane>
                <TabPane tabId="4">
                    <FeatureBannerTab values={values} setFieldValue={setFieldValue} isDiscount={true} isButtonText={false} productData={productData} categoryData={categoryData} setSearch={setSearch} />
                </TabPane>
                <TabPane tabId="5">
                    <MainContentTab values={values} setFieldValue={setFieldValue} productData={productData} categoryData={categoryData} setSearch={setSearch} />
                </TabPane>
                <TabPane tabId="6">
                    <FullWidthBanner values={values} setFieldValue={setFieldValue} productData={productData} categoryData={categoryData} setSearch={setSearch} />
                </TabPane>
                <TabPane tabId="7">
                    <SliderProductTab values={values} setFieldValue={setFieldValue} productData={productData} setSearch={setSearch} />
                </TabPane>
                <TabPane tabId="8">
                    <NewsLetterTab values={values} setFieldValue={setFieldValue} />
                </TabPane>
            </TabContent>
        </Col>
    )
})

export default AllTabsHomePage2