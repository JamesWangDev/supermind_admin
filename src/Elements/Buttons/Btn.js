import React, { useContext } from "react";
import { Button } from "reactstrap";
import I18NextContext from "@/Helper/I18NextContext";
import { useTranslation } from "@/app/i18n/client";

const Btn = (props) => {
  const { i18Lang } = useContext(I18NextContext);
  const { t } = useTranslation(i18Lang, 'common');
  return (
    <Button {...props}>
      <div className={`d-flex align-items-center position-relative${props.loading ? " spinning" : ""}`}>
        {props.children}
        {t(props.title)}
      </div>
    </Button>
  );
};
export default Btn;
