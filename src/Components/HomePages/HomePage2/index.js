import React, { useContext, useRef, useState } from 'react'
import { useQuery } from '@tanstack/react-query';
import { Card, Col, Row } from 'reactstrap';
import TabTitle from '../../Coupon/TabTitle';
import { Form, Formik } from 'formik';
import Loader from '../../CommonComponent/Loader';
import { HomePageAPI } from '../../../Utils/AxiosUtils/API';
import request from '../../../Utils/AxiosUtils';
import { HomePage2SettingTab } from '../../../Data/TabTitleListData';
import FormBtn from '../../../Elements/Buttons/FormBtn';
import HomePage2InitialValue from './HomePage2InitialValue';
import HomePage2Submit from './HomePage2Submit';
import AllTabsHomePage2 from './AllTabsHomePage2';
import useCreate from '../../../Utils/Hooks/useCreate';
import I18NextContext from '@/Helper/I18NextContext';
import { useTranslation } from '@/app/i18n/client';

const HomePageTwoForm = ({ title }) => {
    const { i18Lang } = useContext(I18NextContext);
    const { t } = useTranslation(i18Lang, 'common');
    const [activeTab, setActiveTab] = useState("1");
    const refRefetch = useRef()
    const { data, isLoading } = useQuery([HomePageAPI], () => request({ url: HomePageAPI, params: { slug: 'tokyo' } }), {
        refetchOnWindowFocus: false, select: (res) => { return res.data }
    });
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
            initialValues={{
                ...HomePage2InitialValue(NewSettingsData)
            }}
            onSubmit={(values) => {
                values["_method"] = "put";
                HomePage2Submit(values, mutate)
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
                                    <TabTitle activeTab={activeTab} setActiveTab={setActiveTab} titleList={HomePage2SettingTab} errors={errors} touched={touched} />
                                </Col>
                                <AllTabsHomePage2 values={values} setFieldValue={setFieldValue} activeTab={activeTab} ref={refRefetch} />
                                <FormBtn loading={createLoader} />
                            </Row>
                        </Form>
                    </Card>
                </Col>
            )}
        </Formik>
    )
}

export default HomePageTwoForm