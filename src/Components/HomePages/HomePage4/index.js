import { useContext, useRef, useState } from "react";
import { Form, Formik } from "formik";
import { Card, Col, Row } from "reactstrap";
import { HomePageAPI } from "../../../Utils/AxiosUtils/API";
import { useQuery } from "@tanstack/react-query";
import request from "../../../Utils/AxiosUtils";
import Loader from "../../CommonComponent/Loader";
import TabTitle from "../../Coupon/TabTitle";
import FormBtn from "../../../Elements/Buttons/FormBtn";
import { HomePage4SettingTitle } from "../../../Data/TabTitleListData";
import HomePage4InitialValue from './HomePage4InitialValue';
import HomePage4Submit from './HomePage4Submit';
import AllTabsHomePage4 from "./AllTabsHomePage4";
import useCreate from "../../../Utils/Hooks/useCreate";
import I18NextContext from "@/Helper/I18NextContext";
import { useTranslation } from "@/app/i18n/client";

const HomePageFourForm = ({ title }) => {
    const { i18Lang } = useContext(I18NextContext);
    const { t } = useTranslation(i18Lang, 'common');
    const [activeTab, setActiveTab] = useState("1");
    const refRefetch = useRef()
    const { data, isLoading } = useQuery([HomePageAPI], () => request({ url: HomePageAPI, params: { slug: 'rome' } }), {
        refetchOnWindowFocus: false, select: (res) => res.data
    });
    const { mutate, isLoading: createLoader } = useCreate(`${HomePageAPI}/${data?.id}`, false, false, false, (resDta) => {
        refRefetch?.current?.call()
    });
    let IncludeList = ['status']
    let NewSettingsData = data || {};
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
            initialValues={{
                ...HomePage4InitialValue(NewSettingsData)
            }}
            onSubmit={(values) => {
                values["_method"] = "put";
                HomePage4Submit(values, mutate)
            }}>
            {({ values, errors, touched, setFieldValue }) => (
                <Col>
                    <Card>
                        <div className="title-header option-title">
                            <h5>{t(title)}</h5>
                        </div>
                        <Form className="theme-form theme-form-2 mega-form vertical-tabs">
                            <Row>
                                <Col xl="3" lg="4">
                                    <TabTitle activeTab={activeTab} setActiveTab={setActiveTab} titleList={HomePage4SettingTitle} errors={errors} touched={touched} />
                                </Col>
                                <AllTabsHomePage4 activeTab={activeTab} values={values} setFieldValue={setFieldValue} ref={refRefetch} />
                                <FormBtn loading={createLoader} />
                            </Row>
                        </Form>
                    </Card>
                </Col>
            )}
        </Formik>
    )
}
export default HomePageFourForm