import { useContext, useRef, useState } from "react";
import { Form, Formik } from "formik";
import { Card, Col, Row } from "reactstrap";
import { useQuery } from "@tanstack/react-query";
import { HomePageAPI } from "../../../Utils/AxiosUtils/API";
import request from "../../../Utils/AxiosUtils";
import Loader from "../../CommonComponent/Loader";
import TabTitle from "../../Coupon/TabTitle";
import { HomePage9SettingTitle } from "../../../Data/TabTitleListData";
import FormBtn from "../../../Elements/Buttons/FormBtn";
import HomePage9InitialValue from './HomePage9InitialValue'
import HomePage9Submit from "./HomePage9Submit";
import AllTabsHomePage9 from "./AllTabsHomePage9";
import useCreate from "../../../Utils/Hooks/useCreate";
import I18NextContext from "@/Helper/I18NextContext";
import { useTranslation } from "@/app/i18n/client";

const HomePageNineForm = ({ title }) => {
    const { i18Lang } = useContext(I18NextContext);
    const { t } = useTranslation(i18Lang, 'common');
    const [activeTab, setActiveTab] = useState("1");
    const { data, isLoading } = useQuery([HomePageAPI], () => request({ url: HomePageAPI, params: { slug: 'denver' } }), {
        refetchOnWindowFocus: false, select: (res) => res.data
    });
    const refRefetch = useRef()
    const { mutate, isLoading: createLoader } = useCreate(`${HomePageAPI}/${data?.id}`, false, false, false, (resDta) => {
        refRefetch?.current?.call()
    });
    let NewSettingsData = data || {};
    let IncludeList = ['status']
    const RecursiveSet = ({ data }) => {
        if (data && typeof data == 'object') {
            Object.keys(data).forEach(key => {
                if (data[key] == 0 && IncludeList.includes(key)) {
                    data[key] = false
                } else if (data[key] == 1 && IncludeList.includes(key)) {
                    data[key] = true
                } else {
                    RecursiveSet({ data: data[key] });
                }
            })
        }
    }
    RecursiveSet({ data: NewSettingsData })
    if (isLoading) return <Loader />
    return (
        <Formik
            enableReinitialize
            initialValues={{ ...HomePage9InitialValue(NewSettingsData) }}
            onSubmit={(values) => {
                values["_method"] = "put";
                HomePage9Submit(values, mutate)
            }}>
            {({ values, errors, touched, setFieldValue }) => (
                <Col>
                    <Card>
                        <div className="title-header option-title"><h5>{t(title)}</h5></div>
                        <Form className="theme-form theme-form-2 mega-form vertical-tabs">
                            <Row>
                                <Col xl="3" lg="4">
                                    <TabTitle activeTab={activeTab} setActiveTab={setActiveTab} titleList={HomePage9SettingTitle} errors={errors} touched={touched} />
                                </Col>
                                <Col xl="7" lg="8">
                                    <AllTabsHomePage9 activeTab={activeTab} values={values} setFieldValue={setFieldValue} ref={refRefetch} />
                                </Col>
                                <FormBtn loading={createLoader} />
                            </Row>
                        </Form>
                    </Card>
                </Col>
            )}
        </Formik >
    )
}
export default HomePageNineForm