import I18NextContext from "@/Helper/I18NextContext";
import CheckBoxField from "../InputFields/CheckBoxField";
import SimpleInputField from "../InputFields/SimpleInputField";
import { useTranslation } from "@/app/i18n/client";
import { useContext } from "react";

const NewsLetterTab = () => {
  const { i18Lang } = useContext(I18NextContext);
  const { t } = useTranslation(i18Lang, 'common');
  return (
    <div>
      <SimpleInputField
        nameList={[
          { name: "[values][newsletter][mailchip_api_key]", title: "MailchipApiKey", placeholder: t("EnterMailChipApiKey") },
          { name: "[values][newsletter][mailchip_list_id]", title: "MailchipListId", placeholder: t("EnterMailChipListId") },
        ]}
      />
      <CheckBoxField name="[values][newsletter][status]" title="MailchipStatus" />
    </div>
  );
};

export default NewsLetterTab;
