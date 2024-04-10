'use client'
import { Form, Formik } from 'formik'
import React, { useContext, useRef, useState } from 'react'
import { Col, Row } from 'reactstrap'
import SelectUser from '@/Components/Wallet/SelectUser'
import SeleteWalletPrice from '@/Components/Wallet/SeleteWalletPrice'
import UserTransationsTable from '@/Components/Wallet/UserTransationsTable'
import { UserTransations, WalletCredit, WalletDebit } from '@/Utils/AxiosUtils/API'
import useCreate from '@/Utils/Hooks/useCreate'
import { YupObject, nameSchema } from '@/Utils/Validation/ValidationSchemas'
import { RiWallet2Line } from 'react-icons/ri'
import usePermissionCheck from '@/Utils/Hooks/usePermissionCheck'
import I18NextContext from '@/Helper/I18NextContext'
import { useTranslation } from '@/app/i18n/client'

const Wallet = () => {
    const [isValue, setIsValue] = useState("")
    const [credit, debit] = usePermissionCheck(["credit", "debit"]);
    const { i18Lang } = useContext(I18NextContext);
    const { t } = useTranslation(i18Lang, 'common');
    const refRefetch = useRef()
    const { mutate: CreateWalletCredit, isLoading: creditLoader } = useCreate(WalletCredit, false, "/wallet", false, () => {
        refRefetch.current.call()
    });
    const { mutate: CreateWalletDebit, isLoading: debitLoader } = useCreate(WalletDebit, false, "/wallet", false, () => {
        refRefetch.current.call()
    });
    return (
        <div className='save-back-button'>
            <Formik
                initialValues={{
                    consumer_id: "",
                    showBalance: '',
                    balance: ''
                }}
                validationSchema={YupObject({ consumer_id: nameSchema })}
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
                                <SelectUser title={t("SelectCustomer")} values={values} setFieldValue={setFieldValue} role="consumer" name={'consumer_id'} userRole={''} />
                                <SeleteWalletPrice values={values} setFieldValue={setFieldValue} handleSubmit={handleSubmit} setIsValue={setIsValue} creditLoader={creditLoader} debitLoader={debitLoader} title={t("Wallet")} description={t("WalletBalance")} selectUser={'consumer_id'} icon={<RiWallet2Line />} isCredit={credit} isDebit={debit} />
                            </Row>
                        </Form>
                        <Col sm="12">
                            {values['consumer_id'] !== '' && < UserTransationsTable url={UserTransations} moduleName="UserTransations" setFieldValue={setFieldValue} userIdParams={true} ref={refRefetch} dateRange={true} paramsProps={{ consumer_id: values['consumer_id'] }} />}
                        </Col>
                    </>
                )}
            </Formik>
        </div>
    )
}

export default Wallet;