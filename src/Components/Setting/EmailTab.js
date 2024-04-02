import { useContext } from "react";
import SearchableSelectInput from "../InputFields/SearchableSelectInput";
import SimpleInputField from "../InputFields/SimpleInputField";
import I18NextContext from "@/Helper/I18NextContext";
import { useTranslation } from "@/app/i18n/client";

const EmailTab = ({ values }) => {
  const { i18Lang } = useContext(I18NextContext);
  const { t } = useTranslation(i18Lang, 'common');
  return (
    <>
      <SearchableSelectInput
        nameList={[
          {
            title: "Mailer",
            name: "mail_mailer",
            inputprops: {
              name: "mail_mailer",
              id: "mail_mailer",
              options: [
                { id: "sendmail", name: "SendMail" },
                { id: "smtp", name: "SMTP" },
                { id: "mailgun", name: "MailGun" },
              ],
            },
          },
        ]}
      />
      {
        values?.['mail_mailer'] == "mailgun" ?
          <SimpleInputField
            nameList={[
              { name: "[values][email][mailgun_domain]", title: "MailgunDomain", placeholder: t("EnterMailGunDomain") },
              { name: "[values][email][mailgun_secret]", title: "MailgunSecret", placeholder: t("EnterMailGunSecret") },
            ]}
          />
          :
          <>
            <SimpleInputField
              nameList={[
                { name: "[values][email][mail_host]", title: "Host", placeholder: t("EnterMailHost") },
                { name: "[values][email][mail_port]", title: "Port", placeholder: t("EnterMailPort"), type: "number" }
              ]}
            />
            <SearchableSelectInput
              nameList={[
                {
                  title: "Encryption",
                  name: "mail_encryption",
                  inputprops: {
                    name: "mail_encryption",
                    id: "mail_encryption",
                    options: [
                      { id: "ssl", name: "SSL" },
                      { id: "tls", name: "TLS" },
                    ],
                  },
                },
              ]}
            />
            <SimpleInputField
              nameList={[
                { name: "[values][email][mail_username]", title: "Username", placeholder: t("EnterMailUsername") },
                { name: "[values][email][mail_password]", title: "Password", type: "password", placeholder: t("EnterMailPassword") },
                { name: "[values][email][mail_from_name]", title: "MailFromName", placeholder: t("EnterMailFromName") },
                { name: "[values][email][mail_from_address]", title: "MailFromAddress", placeholder: t("EnterMailFromAddress") },

              ]}
            />
          </>
      }
    </>
  );
};

export default EmailTab;
