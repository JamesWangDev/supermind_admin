import { Col, TabContent, TabPane } from 'reactstrap'
import GeneralTab from './GeneralTab'
import HeaderTab from './HeaderTab'
import FooterTab from './FooterTab'
import CollectionProduct from './CollectionProduct'
import ProductLayout from './ProductLayout'
import SellerTab from './SellerTab'
import BlogTab from './BlogTab'
import ContactPageTab from './ContactPageTab'
import ErrorPage from './ErrorPage'
import SeoTab from './SeoTab'
import { useQuery } from '@tanstack/react-query'
import { Category } from '../../Utils/AxiosUtils/API'
import request from '../../Utils/AxiosUtils'
import Loader from '../CommonComponent/Loader'
import AboutUsTab from './AboutUS'

const ThemeOptionAllTabs = ({ activeTab, values, setFieldValue, errors, touched }) => {
    const { data: categoryData, isLoading } = useQuery([Category], () => request({ url: Category, params: { status: 1 } }), { refetchOnWindowFocus: false, select: (data) => data.data.data });
    if (isLoading) return <Loader />;
    return (
        <Col xl="9" lg="8">
            <TabContent activeTab={activeTab}>
                <TabPane tabId="1"><GeneralTab values={values} setFieldValue={setFieldValue} errors={errors} /></TabPane>
                <TabPane tabId="2"><HeaderTab values={values} setFieldValue={setFieldValue} categoryData={categoryData} /></TabPane>
                <TabPane tabId="3"><FooterTab values={values} setFieldValue={setFieldValue} errors={errors} categoryData={categoryData} /></TabPane>
                <TabPane tabId="4"><CollectionProduct values={values} setFieldValue={setFieldValue} /></TabPane>
                <TabPane tabId="5"><ProductLayout values={values} setFieldValue={setFieldValue} errors={errors} /></TabPane>
                <TabPane tabId="6"><BlogTab values={values} setFieldValue={setFieldValue} /></TabPane>
                <TabPane tabId="7"><SellerTab values={values} setFieldValue={setFieldValue} errors={errors} touched={touched} /></TabPane>
                <TabPane tabId="8"><AboutUsTab values={values} setFieldValue={setFieldValue} /></TabPane>
                <TabPane tabId="9"><ContactPageTab values={values} setFieldValue={setFieldValue} /></TabPane>
                <TabPane tabId="10"><ErrorPage values={values} /></TabPane>
                <TabPane tabId="11"><SeoTab values={values} setFieldValue={setFieldValue} errors={errors} /></TabPane>
            </TabContent>
        </Col>
    )
}

export default ThemeOptionAllTabs