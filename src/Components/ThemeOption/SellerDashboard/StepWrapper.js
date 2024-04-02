import { useContext } from "react";
import SimpleInputField from "../../InputFields/SimpleInputField"
import I18NextContext from "@/Helper/I18NextContext";
import { useTranslation } from "@/app/i18n/client";

const StepWrapper = ({ stepDetails }) => {
  const { i18Lang } = useContext(I18NextContext);
  const { t } = useTranslation(i18Lang, 'common');
  return (
    <div>
      <h4 className="fw-semibold mb-3 txt-primary w-100">{t(stepDetails?.title)}</h4>
      <SimpleInputField
        nameList={[
          { name: `[options][seller][steps][${stepDetails.value}][title]`, title: 'Title', placeholder: t('EnterTitle') },
          { name: `[options][seller][steps][${stepDetails.value}][description]`, type: "textarea", title: 'description', placeholder: t('EnterDescription') },
        ]}
      />
    </div>
  )
}

export default StepWrapper