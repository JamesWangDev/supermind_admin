import React, { useContext, useRef, useState } from 'react'
import { Card, Col, Row, TabContent } from 'reactstrap';
import { useQuery } from '@tanstack/react-query';
import { Form, Formik } from 'formik';
import TabTitle from '../../Coupon/TabTitle';
import Loader from '../../CommonComponent/Loader';
import { HomePageAPI } from '../../../Utils/AxiosUtils/API';
import request from '../../../Utils/AxiosUtils';
import FormBtn from '../../../Elements/Buttons/FormBtn';
import { HomePage5SettingTitle } from '../../../Data/TabTitleListData';
import HomePage5InitialValue from './HomePage5InitialValue';
import HomePage5Submit from './HomePage5Submit';
import AllHomePage5Tabs from './AllHomePage5Tabs';
import useCreate from '../../../Utils/Hooks/useCreate';
import I18NextContext from '@/Helper/I18NextContext';
import { useTranslation } from '@/app/i18n/client';

const HomePageFiveForm = ({ title }) => {
    const { i18Lang } = useContext(I18NextContext);
    const { t } = useTranslation(i18Lang, 'common');
    const [activeTab, setActiveTab] = useState("1");
    const refRefetch = useRef()
    const { data, isLoading } = useQuery([HomePageAPI], () => request({ url: HomePageAPI, params: { slug: 'madrid' } }), {
        refetchOnWindowFocus: false, select: (res) => res.data
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
                ...HomePage5InitialValue(NewSettingsData)
            }}
            onSubmit={(values) => {
                values["_method"] = "put";
                HomePage5Submit(values, mutate)
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
                                    <TabTitle activeTab={activeTab} setActiveTab={setActiveTab} titleList={HomePage5SettingTitle} errors={errors} touched={touched} />
                                </Col>
                                <Col xl="7" lg="8">
                                    <TabContent activeTab={activeTab}>
                                        <AllHomePage5Tabs values={values} setFieldValue={setFieldValue} ref={refRefetch} />
                                    </TabContent>
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

export default HomePageFiveForm