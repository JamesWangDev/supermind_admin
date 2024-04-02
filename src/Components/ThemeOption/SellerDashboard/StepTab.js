import { useContext } from "react";
import StepWrapper from "./StepWrapper";
import SimpleInputField from "../../InputFields/SimpleInputField";
import CheckBoxField from "../../InputFields/CheckBoxField";
import I18NextContext from "@/Helper/I18NextContext";
import { useTranslation } from "@/app/i18n/client";

const StepTab = () => {
    const { i18Lang } = useContext(I18NextContext);
    const { t } = useTranslation(i18Lang, 'common');
    return (
        <>
            <CheckBoxField name="[options][seller][steps][status]" title="status" />
            <SimpleInputField nameList={[{ name: '[options][seller][steps][title]', title: 'Title', placeholder: t('EnterTitle') }]} />
            <StepWrapper stepDetails={{ value: "step_1", title: "Step1" }} />
            <StepWrapper stepDetails={{ value: "step_2", title: "Step2" }} />
            <StepWrapper stepDetails={{ value: "step_3", title: "Step3" }} />
        </>
    )
}

export default StepTab