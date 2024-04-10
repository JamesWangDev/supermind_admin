import React, { useContext, useRef, useState } from 'react'
import { Card, Col, Row } from 'reactstrap';
import Loader from '../../CommonComponent/Loader';
import { useQuery } from '@tanstack/react-query';
import { HomePageAPI } from '../../../Utils/AxiosUtils/API';
import request from '../../../Utils/AxiosUtils';
import { Formik, Form } from 'formik';
import TabTitle from '../../Coupon/TabTitle';
import FormBtn from '../../../Elements/Buttons/FormBtn';
import { HomePage6SettingTitle } from '../../../Data/TabTitleListData';
import HomePage6InitialValue from './HomePage6InitialValue';
import HomePage6Submit from './HomePage6Submit';
import AllTabsHomePage6 from './AllTabsHomePage6';
import useCreate from '../../../Utils/Hooks/useCreate';
import I18NextContext from '@/Helper/I18NextContext';
import { useTranslation } from '@/app/i18n/client';

const HomePageSixForm = ({ title }) => {
    const { i18Lang } = useContext(I18NextContext);
    const { t } = useTranslation(i18Lang, 'common');
    const [activeTab, setActiveTab] = useState("1");
    const { data, isLoading } = useQuery(['berlin'], () => request({ url: HomePageAPI, params: { slug: 'berlin' } }), {
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
            initialValues={{
                ...HomePage6InitialValue(NewSettingsData)
            }}
            onSubmit={(values) => {
                values["_method"] = "put";
                HomePage6Submit(values, mutate)
            }}>
            {({ values, errors, touched, setFieldValue }) => (
                <Col>
                    <Card>
                        <div className="title-header option-title"><h5>{t(title)}</h5></div>
                        <Form className="theme-form theme-form-2 mega-form vertical-tabs">
                            <Row>
                                <Col xl="3" lg="4">
                                    <TabTitle activeTab={activeTab} setActiveTab={setActiveTab} titleList={HomePage6SettingTitle} errors={errors} touched={touched} />
                                </Col>
                                <Col xl="7" lg="8">
                                    <AllTabsHomePage6 activeTab={activeTab} values={values} setFieldValue={setFieldValue} ref={refRefetch} />
                                </Col>
                                <FormBtn loading={createLoader} />
                            </Row>
                        </Form>
                    </Card>
                </Col>
            )}
        </Formik>
    )
}
export default HomePageSixForm