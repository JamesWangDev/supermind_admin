import { Col, TabContent, TabPane } from 'reactstrap'
import HomeBannerTab from './HomeBannerTab'
import FeatureBannerTab from './FeatureBannerTab'
import MainContentTab from './MainContentTab'
import NewsLetterTab from './NewsLetterTab'
import Loader from '../../CommonComponent/Loader'
import { useQuery } from '@tanstack/react-query'
import { Category, product } from '../../../Utils/AxiosUtils/API'
import request from '../../../Utils/AxiosUtils'
import placeHolderImage from "../../../../public/assets/images/placeholder.png";
import { forwardRef, useEffect, useImperativeHandle, useState } from 'react'

const AllTabsHomePage1 = forwardRef(({ activeTab, values, setFieldValue }, ref) => {
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
                <TabPane tabId="1"><HomeBannerTab values={values} setFieldValue={setFieldValue} productData={productData} categoryData={categoryData} setSearch={setSearch} /></TabPane>
                <TabPane tabId="2"><FeatureBannerTab values={values} setFieldValue={setFieldValue} productData={productData} categoryData={categoryData} isDiscount={true} isButtonText={true} setSearch={setSearch} /></TabPane>
                <TabPane tabId="3"><MainContentTab values={values} setFieldValue={setFieldValue} productData={productData} categoryData={categoryData} setSearch={setSearch} /></TabPane>
                <TabPane tabId="4"><NewsLetterTab values={values} setFieldValue={setFieldValue} /></TabPane>
            </TabContent>
        </Col>
    )
})

export default AllTabsHomePage1