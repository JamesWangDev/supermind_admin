import MultiSelectField from "../../InputFields/MultiSelectField";
import SimpleInputField from "../../InputFields/SimpleInputField";
import { useQuery } from "@tanstack/react-query";
import request from "../../../Utils/AxiosUtils";
import Loader from "../../CommonComponent/Loader";
import CheckBoxField from "../../InputFields/CheckBoxField";
import { blog } from "../../../Utils/AxiosUtils/API";
import I18NextContext from "@/Helper/I18NextContext";
import { useContext } from "react";
import { useTranslation } from "@/app/i18n/client";

const FeatureBlogTab = ({ values, setFieldValue }) => {
    const { i18Lang } = useContext(I18NextContext);
    const { t } = useTranslation(i18Lang, 'common');
    const { data, isLoading } = useQuery([blog], () => request({ url: blog }), {
        refetchOnWindowFocus: false, select: (res) => res?.data?.data.map((elem) => { return { id: elem.id, name: elem.title } })
    });
    if (isLoading) return <Loader />
    return (
        <>
            <SimpleInputField nameList={[
                { name: `[content][featured_blogs][title]`, placeholder: t("EnterTitle"), title: "Title" }, { name: `[content][featured_blogs][description]`, placeholder: t("EnterDescription"), title: "Description", type: "textarea" }
            ]} />
            <MultiSelectField values={values} setFieldValue={setFieldValue} name='featureBlogSelect' title="Blogs" data={data} />
            <CheckBoxField name={`[content][featured_blogs][status]`} title="Status" />
        </>
    )
}
export default FeatureBlogTab