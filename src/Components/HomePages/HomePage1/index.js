import React, { useContext, useRef, useState } from 'react'
import { useQuery } from '@tanstack/react-query';
import { Form, Formik } from 'formik';
import { Card, Col, Row } from 'reactstrap';
import TabTitle from '../../Coupon/TabTitle';
import FormBtn from '../../../Elements/Buttons/FormBtn';
import { HomePage1SettingTitle } from '../../../Data/TabTitleListData';
import request from '../../../Utils/AxiosUtils';
import { HomePageAPI } from '../../../Utils/AxiosUtils/API';
import Loader from '../../CommonComponent/Loader';
import HomePage1Submit from './HomePage1Submit';
import HomePage1InitialValue from './HomePage1InitialValue';
import useCreate from '../../../Utils/Hooks/useCreate';
import { RecursiveSet } from '../../../Utils/CustomFunctions/RecursiveSet';
import AllTabsHomePage1 from './AllTabsHomePage1';
import I18NextContext from '@/Helper/I18NextContext';
import { useTranslation } from '@/app/i18n/client';

const HomePageOneForm = ({ title }) => {
    const { i18Lang } = useContext(I18NextContext);
    const { t } = useTranslation(i18Lang, 'common');
    const [activeTab, setActiveTab] = useState("1");
    const refRefetch = useRef()
    const { data, isLoading } = useQuery(['HomePageAPI'], () => request({ url: HomePageAPI, params: { slug: 'paris' } }), {
        refetchOnWindowFocus: false, select: (res) => {
            return res.data
        }
    });
    const { mutate, isLoading: createLoader } = useCreate(`${HomePageAPI}/${data?.id}`, false, false, false, (resDta) => {
        refRefetch?.current?.call()
    });
    let NewSettingsData = data || {};
    let IncludeList = ['status']
    RecursiveSet({ data: NewSettingsData, IncludeList })

    if (isLoading) return <Loader />
    return (
        <Formik
            enableReinitialize
            initialValues={{
                ...HomePage1InitialValue(NewSettingsData)
            }}
            onSubmit={(values) => {
                values["_method"] = "put";
                HomePage1Submit(values, mutate)
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
                                    <TabTitle activeTab={activeTab} setActiveTab={setActiveTab} titleList={HomePage1SettingTitle} errors={errors} touched={touched} />
                                </Col>
                                <AllTabsHomePage1 activeTab={activeTab} values={values} setFieldValue={setFieldValue} isLoading={isLoading} ref={refRefetch} />
                                <FormBtn loading={createLoader} />
                            </Row>
                        </Form>
                    </Card>
                </Col>
            )}
        </Formik>
    )
}

export default HomePageOneForm