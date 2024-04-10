"use client"
import React, { useContext, useEffect, useRef, useState } from 'react';
import { Col, Row } from 'reactstrap';
import { Form, Formik } from 'formik';
import { RiWallet2Line } from 'react-icons/ri';
import AccountContext from '@/Helper/AccountContext';
import usePermissionCheck from '@/Utils/Hooks/usePermissionCheck';
import { YupObject, nameSchema } from '@/Utils/Validation/ValidationSchemas';
import { VendorTransations, VendorWalletCredit, VendorWalletDebit } from '@/Utils/AxiosUtils/API';
import useCreate from '@/Utils/Hooks/useCreate';
import SeleteWalletPrice from '@/Components/Wallet/SeleteWalletPrice';
import SelectUser from '@/Components/Wallet/SelectUser';
import WrappedVendor from '@/Components/Wallet/WrappedVendor';
import I18NextContext from '@/Helper/I18NextContext';
import { useTranslation } from '@/app/i18n/client';

const VendorWallet = () => {
    const { role, setRole } = useContext(AccountContext)
    useEffect(() => {
        setRole(JSON.parse(localStorage.getItem("role"))?.name)
    }, [])
    const { i18Lang } = useContext(I18NextContext);
    const { t } = useTranslation(i18Lang, 'common');
    const [credit, debit] = usePermissionCheck(["credit", "debit"]);
    const [isValue, setIsValue] = useState("");
    const refRefetch = useRef()
    const { mutate: CreateWalletCredit, isLoading: creditLoader } = useCreate(VendorWalletCredit, false, "/vendor_wallet", false, () => {
        refRefetch.current.call()
    });
    const { mutate: CreateWalletDebit, isLoading: debitLoader } = useCreate(VendorWalletDebit, false, "/vendor_wallet", false, () => {
        refRefetch.current.call()
    });
    return (
        <div className='save-back-button'>
            <Formik
                initialValues={{
                    vendor_id: "",
                    showBalance: '',
                    balance: ''
                }}
                validationSchema={YupObject({ vendor_id: nameSchema })}
                onSubmit={(values) => {
                    if (isValue == "credit") {
                        CreateWalletCredit(values)
                    } else {
                        CreateWalletDebit(values)
                    }
                }}>
                {({ values, handleSubmit, setFieldValue }) => (
                    <>
                        <Form>
                            <Row>
                                {role !== "vendor" && <SelectUser title={t("SelectVendor")} values={values} setFieldValue={setFieldValue} role={"vendor"} name={'vendor_id'} userRole={role} />}
                                <SeleteWalletPrice values={values} setFieldValue={setFieldValue} handleSubmit={handleSubmit} setIsValue={setIsValue} creditLoader={creditLoader} debitLoader={debitLoader} title={t("Wallet")} description={t("WalletBalance")} selectUser={'vendor_id'} icon={<RiWallet2Line />} isCredit={credit} isDebit={debit} role={role} />
                            </Row>
                        </Form>
                        <Col sm="12">
                            <WrappedVendor url={VendorTransations} moduleName="UserTransations" setFieldValue={setFieldValue} values={values} ref={refRefetch} dateRange={true} userIdParams={true} role={role} />
                        </Col>
                    </>
                )}
            </Formik>
        </div>
    )
}

export default VendorWallet;