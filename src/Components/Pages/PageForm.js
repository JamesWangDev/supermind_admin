import React, { useContext, useEffect } from 'react'
import { Formik, Form } from 'formik';
import SimpleInputField from '../InputFields/SimpleInputField';
import CheckBoxField from '../InputFields/CheckBoxField';
import FormBtn from '../../Elements/Buttons/FormBtn';
import { YupObject, nameSchema } from '../../Utils/Validation/ValidationSchemas';
import { PagesAPI } from '../../Utils/AxiosUtils/API';
import { useQuery } from '@tanstack/react-query';
import request from '../../Utils/AxiosUtils';
import Loader from '../CommonComponent/Loader';
import DescriptionInput from '../Product/DescriptionInput';
import FileUploadField from '../InputFields/FileUploadField';
import I18NextContext from '@/Helper/I18NextContext';
import { useTranslation } from '@/app/i18n/client';

const PageForm = ({ updateId, mutate, loading }) => {
    const { i18Lang } = useContext(I18NextContext);
    const { t } = useTranslation(i18Lang, 'common');
    const { data: oldData, isLoading, refetch } = useQuery([`page/id`], () => request({ url: `${PagesAPI}/${updateId}` }), { enabled: false, select: (data) => data?.data });
    useEffect(() => {
        updateId && refetch();
    }, [updateId]);
    if (updateId && isLoading) return <Loader />;
    return (
        <Formik
            enableReinitialize
            initialValues={{
                title: updateId ? oldData?.title || "" : "",
                content: updateId ? oldData?.content || "" : "",
                meta_title: updateId ? oldData?.meta_title || "" : "",
                meta_description: updateId ? oldData?.meta_description || "" : "",
                page_meta_image_id: updateId ? oldData?.page_meta_image_id?.id || "" : "",
                page_meta_image: updateId ? oldData?.page_meta_image || "" : "",
                status: updateId ? Boolean(Number(oldData?.status)) : true,
            }}
            validationSchema={YupObject({
                title: nameSchema
            })}
            onSubmit={(values) => {
                values.status = Number(values.status);
                mutate(values);
            }}>
            {({ values, setFieldValue, errors, touched }) => (
                <>
                    <Form id="blog" className="theme-form theme-form-2 mega-form">
                        <SimpleInputField nameList={[{ name: "title", placeholder: t("EnterTitle"), require: "true" }]} />
                        <DescriptionInput values={values} setFieldValue={setFieldValue} title={'Content'} nameKey="content" />
                        <SimpleInputField nameList={[{ name: "meta_title", title: "MetaTitle", placeholder: t("EnterTitle") }, { name: "meta_description", title: "MetaDescription", placeholder: t("EnterDescription") }]} />
                        <FileUploadField name="page_meta_image_id" title='PageMetaImage' id="page_meta_image_id" updateId={updateId} type="file" values={values} setFieldValue={setFieldValue} errors={errors} touched={touched} />
                        <CheckBoxField name="status" />
                        <FormBtn loading={Number(loading)} />
                    </Form>
                </>
            )}
        </Formik>
    )
}

export default PageForm