import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react'
import { TabPane } from 'reactstrap'
import HomeBanner5Tab from './HomeBanner5Tab'
import FeatureBannerTab from '../HomePage1/FeatureBannerTab'
import CategoriesImageList from '../HomePage4/CategoriesImageList'
import ProductListCategory6Tab from './ProductListCategory6Tab'
import OrderTabs from './OrderTabs'
import { useQuery } from '@tanstack/react-query'
import { Category, product } from '../../../Utils/AxiosUtils/API'
import request from '../../../Utils/AxiosUtils'
import placeHolderImage from "../../../../public/assets/images/placeholder.png";
import Loader from '../../CommonComponent/Loader'

const AllHomePage5Tabs = forwardRef(({ values, setFieldValue }, ref) => {
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
        <>
            <TabPane tabId="1">
                <HomeBanner5Tab values={values} setFieldValue={setFieldValue} productData={productData} categoryData={categoryData} setSearch={setSearch} />
            </TabPane>
            <TabPane tabId="2">
                <FeatureBannerTab values={values} setFieldValue={setFieldValue} isDiscount={false} isButtonText={true} productData={productData} categoryData={categoryData} setSearch={setSearch} />
            </TabPane>
            <TabPane tabId="3">
                <CategoriesImageList values={values} setFieldValue={setFieldValue} categoryData={categoryData} />
            </TabPane>
            <TabPane tabId="4">
                <ProductListCategory6Tab values={values} setFieldValue={setFieldValue} productName={'product1ProductIds'} nameKey={'products_list_1'} productData={productData} setSearch={setSearch} />
            </TabPane>
            <OrderTabs values={values} setFieldValue={setFieldValue} productData={productData} categoryData={categoryData} setSearch={setSearch} />
        </>
    )
})
export default AllHomePage5Tabs