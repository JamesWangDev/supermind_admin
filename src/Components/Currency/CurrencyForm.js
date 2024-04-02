import { useQuery } from '@tanstack/react-query';
import { Form, Formik } from 'formik';
import React, { useContext, useEffect } from 'react'
import { Row } from 'reactstrap';
import { AllCurrencyData } from '../../Data/AllCurrencyData';
import FormBtn from '../../Elements/Buttons/FormBtn';
import request from '../../Utils/AxiosUtils';
import { currency } from '../../Utils/AxiosUtils/API';
import { nameSchema, YupObject } from '../../Utils/Validation/ValidationSchemas';
import Loader from '../CommonComponent/Loader';
import CheckBoxField from '../InputFields/CheckBoxField';
import SearchableSelectInput from '../InputFields/SearchableSelectInput';
import SimpleInputField from '../InputFields/SimpleInputField';
import CurrencySymbol from './CurrencySymbol';
import I18NextContext from '@/Helper/I18NextContext';
import { useTranslation } from '@/app/i18n/client';

const CurrencyForm = ({ mutate, loading, updateId, }) => {
    const { i18Lang } = useContext(I18NextContext);
    const { t } = useTranslation(i18Lang, 'common');
    const { data: oldData, isLoading: oldDataLoading, refetch } = useQuery(["/currency/id"], () => request({ url: `${currency}/${updateId}` }), {
        enabled: false, select: (data) => data?.data
    });
    useEffect(() => {
        updateId && refetch();
    }, [updateId]);
    if (updateId && oldDataLoading) return <Loader />;
    return (
        <Formik
            enableReinitialize
            initialValues={{
                code: updateId ? oldData?.code || "" : "",
                symbol: updateId ? oldData?.symbol || "" : "",
                no_of_decimal: updateId ? oldData?.no_of_decimal || "" : "",
                exchange_rate: updateId ? Number(oldData?.exchange_rate) || "" : "",
                symbol_position: updateId ? oldData?.symbol_position || "" : "",
                status: updateId ? Boolean(Number(oldData?.status)) : true,
            }}
            validationSchema={YupObject({
                code: nameSchema, symbol: nameSchema, exchange_rate: nameSchema, symbol_position: nameSchema
            })}
            onSubmit={(values) => {
                values["status"] = Number(values["status"]);
                mutate(values);
            }}>
            {({ values, setFieldValue }) => (
                <Form className="theme-form theme-form-2 mega-form">
                    <Row>
                        <SearchableSelectInput
                            nameList={[
                                {
                                    name: "code", title: "CurrencyCode", require: "true",
                                    inputprops: {
                                        name: "code", id: "code", options: AllCurrencyData.map((elem) => { return { id: elem.currency_code, name: elem.currency_code } }), defaultOption: "Select Code",
                                    },
                                }
                            ]}
                        />
                        <CurrencySymbol values={values} setFieldValue={setFieldValue} />
                        <SimpleInputField nameList={[{ title: "DecimalNumber", name: "no_of_decimal", type: "number", placeholder: t("EnterDecimalNumber") }, {
                            name: "exchange_rate", title: "ExchangeRate", require: "true", type: "number", placeholder: t("EnterExchangeRate"), helpertext: "*Specify the exchange rate for converting other currencies to US Dollars (USD)."
                        }]} />
                        <SearchableSelectInput
                            nameList={
                                [
                                    {
                                        name: "symbol_position", title: "SymbolPosition", require: "true",
                                        inputprops: {
                                            name: "symbol_position",
                                            id: "symbol_position",
                                            options: [
                                                { id: "after_price", name: "AfterPrice" },
                                                { id: "before_price", name: "BeforePrice" },
                                            ],
                                            defaultOption: "Select Type",
                                        },
                                    },
                                ]
                            }
                        />
                        <CheckBoxField name="status" />

                        <FormBtn loading={loading} />
                    </Row>
                </Form>
            )}
        </Formik>
    )
}

export default CurrencyForm