import { useContext, useState } from "react";
import Image from "next/image";
import { Input, Label, Row, TabContent, TabPane } from "reactstrap";
import TabTitle from "../Coupon/TabTitle"
import { SellerAboutStore, SellerDashboardTitles, SellerSetailsStore } from "../../Data/TabTitleListData";
import AboutSeller from "./SellerDashboard/AboutSeller";
import ServiceSeller from "./SellerDashboard/ServiceSeller";
import StepTab from "./SellerDashboard/StepTab";
import Selling from "./SellerDashboard/Selling";
import I18NextContext from "@/Helper/I18NextContext";
import { useTranslation } from "@/app/i18n/client";

const SellerTab = ({ values, setFieldValue, errors, touched }) => {
    const [activeTab, setActiveTab] = useState("1");
    const { i18Lang } = useContext(I18NextContext);
    const { t } = useTranslation(i18Lang, 'common');
    return (
        <div className="inside-horizontal-tabs">
            <div className='selection-layout mb-4 radio-type-sec'>
                <h4 className='fw-semibold w-100'>{t("StoreLayout")}</h4>
                <Row xxl={4} xl={3} lg={2} md={3} xs={2} className='g-4 w-100'>
                    {SellerAboutStore.map((elem, i) => (
                        <div key={i} onClick={() => setFieldValue("[options][seller][store_layout]", elem?.value)}>
                            <div className="selection-box text-center">
                                <Input name={'store_layout'} type="radio" id={elem?.value} defaultChecked={values['options']?.['seller']?.['store_layout'] == elem.value ? true : false} />
                                <Label htmlFor={elem?.value}>
                                    <div>
                                        <Image src={elem.img} className="img-fluid" alt={elem?.title} width={165} height={100} />
                                    </div>
                                    <h4 className="mt-2">{t(elem.title)}</h4>
                                </Label>
                            </div>
                        </div>
                    ))}
                </Row>
            </div>
            <div className='selection-layout mb-4 radio-type-sec'>
                <h4 className='fw-semibold w-100'>{t("StoreDetails")}</h4>
                <Row xxl={4} xl={3} lg={2} md={3} xs={2} className='g-4 w-100'>
                    {SellerSetailsStore.map((elem, i) => (
                        <div key={i} onClick={() => setFieldValue("[options][seller][store_details]", elem?.value)}>
                            <div className="selection-box text-center">
                                <Input name={'store_details'} type="radio" id={elem.value} defaultChecked={values['options']?.['seller']?.['store_details'] == elem.value ? true : false} />
                                <Label htmlFor={elem.value}>
                                    <div>
                                        <Image src={elem.img} className="img-fluid" alt={elem?.title} width={165} height={100} />
                                    </div>
                                    <h4 className="mt-2">{t(elem.title)}</h4>
                                </Label>
                            </div>
                        </div>
                    ))}
                </Row>
            </div>
            <TabTitle activeTab={activeTab} setActiveTab={setActiveTab} titleList={SellerDashboardTitles} errors={errors} touched={touched} />
            <TabContent activeTab={activeTab}>
                <TabPane tabId="1">
                    <AboutSeller values={values} setFieldValue={setFieldValue} errors={errors} />
                </TabPane>
                <TabPane tabId="2">
                    <ServiceSeller values={values} setFieldValue={setFieldValue} errors={errors} />
                </TabPane>
                <TabPane tabId="3">
                    <StepTab values={values} setFieldValue={setFieldValue} errors={errors} />
                </TabPane>
                <TabPane tabId="4">
                    <Selling values={values} setFieldValue={setFieldValue} errors={errors} />
                </TabPane>
            </TabContent>
        </div>
    )
}

export default SellerTab