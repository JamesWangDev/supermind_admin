import { useQuery } from "@tanstack/react-query";
import { Form, Formik } from "formik";
import { useContext, useEffect } from "react";
import FormBtn from "../../Elements/Buttons/FormBtn";
import request from "../../Utils/AxiosUtils";
import { blog, Category, tag } from "../../Utils/AxiosUtils/API";
import { dropDownScheme, nameSchema, YupObject } from "../../Utils/Validation/ValidationSchemas";
import CheckBoxField from "../InputFields/CheckBoxField";
import FileUploadField from "../InputFields/FileUploadField";
import MultiSelectField from "../InputFields/MultiSelectField";
import SimpleInputField from "../InputFields/SimpleInputField";
import DescriptionInput from "../Product/DescriptionInput";
import { getHelperText } from '../../Utils/CustomFunctions/getHelperText';
import I18NextContext from "@/Helper/I18NextContext";
import { useTranslation } from "@/app/i18n/client";

const BlogForm = ({ mutate, loading, updateId }) => {
  const { i18Lang } = useContext(I18NextContext);
  const { t } = useTranslation(i18Lang, 'common');
  const { data } = useQuery([Category], () => request({ url: Category, params: { type: "post" } }), { refetchOnWindowFocus: false, select: (data) => data.data.data });
  const { data: tagData } = useQuery([tag], () => request({ url: tag, params: { type: "post" } }), { refetchOnWindowFocus: false, select: (data) => data.data.data });
  const { data: oldData, isLoading: oldDataLoading, refetch } = useQuery([blog + "/" + updateId], () => request({ url: `${blog}/${updateId}` }), { enabled: false, refetchOnWindowFocus: false });
  useEffect(() => {
    updateId && refetch();
  }, [updateId]);
  if (updateId && oldDataLoading) return null;
  return (
    <>
      <Formik
        enableReinitialize
        initialValues={{
          title: updateId ? oldData?.data?.title || "" : "",
          description: updateId ? oldData?.data?.description || "" : "",
          content: updateId ? oldData?.data?.content || "" : "",
          meta_title: updateId ? oldData?.data?.meta_title || "" : "",
          meta_description: updateId ? oldData?.data?.meta_description || "" : "",
          blog_meta_image_id: updateId ? oldData?.data?.blog_meta_image?.id || "" : "",
          blog_meta_image: updateId ? oldData?.data?.blog_meta_image || "" : "",
          blog_thumbnail_id: updateId ? oldData?.data?.blog_thumbnail?.id || "" : undefined,
          blog_thumbnail: updateId ? oldData?.data?.blog_thumbnail || "" : "",
          categories: updateId ? oldData?.data?.categories.map((item) => item.id) || [] : [],
          tags: updateId ? oldData?.data?.tags.map((item) => item.id) || [] : [],
          is_featured: updateId ? Boolean(Number(oldData?.data?.is_featured)) : true,
          is_sticky: updateId ? Boolean(Number(oldData?.data?.is_sticky)) : true,
          status: updateId ? Boolean(Number(oldData?.data?.status)) : true,
        }}
        validationSchema={YupObject({
          title: nameSchema,
          blog_thumbnail_id: nameSchema,
          categories: dropDownScheme
        })}
        onSubmit={(values) => {
          if (updateId) {
            values["_method"] = "put";
          }
          values.is_featured = Number(values.is_featured);
          values.is_sticky = Number(values.is_sticky);
          values.status = Number(values.status);
          if (values['blog_thumbnail_id'] == undefined) values['blog_thumbnail_id'] = null
          mutate(values);
        }}>
        {({ values, setFieldValue, errors, touched }) => (
          <>
            <Form id="blog" className="theme-form theme-form-2 mega-form">
              <SimpleInputField nameList={[{ name: "title", placeholder: t("EnterBlogTitle"), require: "true" }]} />
              <SimpleInputField nameList={[{ name: "description", placeholder: t("EnterBlogDescription") }]} />
              <DescriptionInput values={values} setFieldValue={setFieldValue} title={'Content'} nameKey="content" />
              <FileUploadField name="blog_thumbnail_id" title='Thumbnail' require='true' id="blog_thumbnail_id" updateId={updateId} type="file" values={values} setFieldValue={setFieldValue} errors={errors} touched={touched} helpertext={getHelperText("1500x700px")} />
              <MultiSelectField errors={errors} values={values} setFieldValue={setFieldValue} name="categories" data={data} require='true' />
              <MultiSelectField errors={errors} values={values} setFieldValue={setFieldValue} name="tags" data={tagData} />
              <CheckBoxField name="is_featured" title="Featured" />
              <CheckBoxField name="is_sticky" title="Sticky" />
              <SimpleInputField nameList={[{ name: "meta_title", placeholder: t("EnterMetaTitle") }, { name: "meta_description", placeholder: t("EnterMetaDescription"), type: 'textarea' }]} />
              <FileUploadField name="blog_meta_image_id" title='BlogMetaImage' id="blog_meta_image_id" updateId={updateId} type="file" values={values} setFieldValue={setFieldValue} errors={errors} touched={touched} />
              <CheckBoxField name="status" />
              <FormBtn loading={Number(loading)} />
            </Form>
          </>
        )}
      </Formik>
    </>
  );
};

export default BlogForm;
