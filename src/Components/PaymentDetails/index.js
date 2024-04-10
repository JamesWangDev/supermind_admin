import React, { useEffect, useState } from 'react'
import TabTitle from '../Coupon/TabTitle';
import { TabContent, TabPane } from 'reactstrap';
import { PaymentDetailTab } from '../../Data/TabTitleListData';
import PaypalTab from './PaypalTab';
import BankDetailTab from './BankDetailTab';
import { Form, Formik } from 'formik';
import Btn from '../../Elements/Buttons/Btn';
import useCreate from '../../Utils/Hooks/useCreate';
import { PaymentAccount } from '../../Utils/AxiosUtils/API';
import request from '../../Utils/AxiosUtils';
import { useQuery } from '@tanstack/react-query';

const PaymentDetailsForm = () => {
    const [activeTab, setActiveTab] = useState("1");
    const { data, isLoading: getPaymentLoader, refetch } = useQuery([PaymentAccount], () => request({ url: PaymentAccount }), {
        enabled: false, refetchOnWindowFocus: false, select: (res) => { return res?.data }
    });
    useEffect(() => {
        refetch()
    }, [])
    const { mutate, isLoading } = useCreate(PaymentAccount, false, "/payment_account");
    return (
        <Formik
            enableReinitialize
            initialValues={{
                bank_account_no: data ? data?.bank_account_no : "",
                bank_holder_name: data ? data?.bank_holder_name : "",
                bank_name: data ? data?.bank_name : '',
                paypal_email: data ? data?.paypal_email : "",
                swift: data ? data?.swift : "",
                ifsc: data ? data?.ifsc : "",
                paypal_email: data ? data?.paypal_email : "",
            }}
            onSubmit={(values) => {
                mutate(values);
            }}>
            {({ }) => (
                <Form className="theme-form theme-form-2 mega-form">
                    <div className="inside-horizontal-tabs">
                        <TabTitle activeTab={activeTab} setActiveTab={setActiveTab} titleList={PaymentDetailTab} />
                        <TabContent activeTab={activeTab}>
                            <TabPane tabId="1">
                                <BankDetailTab />
                            </TabPane>
                            <TabPane tabId="2">
                                <PaypalTab />
                            </TabPane>
                        </TabContent>
                    </div>
                    <Btn className="btn btn-theme ms-auto mt-4" type="submit" title="Save" loading={Number(isLoading)} />
                </Form>
            )}
        </Formik>
    )
}

export default PaymentDetailsForm