import SimpleInputField from '../../InputFields/SimpleInputField';
import Loader from '../../CommonComponent/Loader';
import { useQuery } from '@tanstack/react-query';
import { blog } from '../../../Utils/AxiosUtils/API';
import request from '../../../Utils/AxiosUtils';
import MultiSelectField from '../../InputFields/MultiSelectField';
import CheckBoxField from '../../InputFields/CheckBoxField';
import I18NextContext from '@/Helper/I18NextContext';
import { useContext } from 'react';
import { useTranslation } from '@/app/i18n/client';

const FeatureBlog4 = ({ values, setFieldValue }) => {
    const { i18Lang } = useContext(I18NextContext);
    const { t } = useTranslation(i18Lang, 'common');
    const { data, isLoading } = useQuery([blog], () => request({ url: blog }), {
        refetchOnWindowFocus: false, select: (res) => res?.data?.data.map((elem) => { return { id: elem.id, name: elem.title } })
    });
    if (isLoading) return <Loader />
    return (
        <>
            <SimpleInputField nameList={[{ name: `[content][featured_blogs][title]`, placeholder: t("EnterTitle"), title: "Title" }]} />
            <MultiSelectField name='featureBlogSelect' title="Blogs" data={data} values={values} setFieldValue={setFieldValue} />
            <CheckBoxField name={`[content][featured_blogs][status]`} title="Status" />
        </>
    )
}

export default FeatureBlog4